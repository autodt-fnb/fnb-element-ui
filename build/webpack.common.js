const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const config = require('./config')

module.exports = {
  mode: 'production',
  entry: {
    index: [path.resolve(process.cwd(), './src/index.ts')]
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        },
        parallel: true,
        extractComments: false
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              appendTsxSuffixTo: ['\\.vue$']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: { indentedSyntax: false }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new OptimizeCssnanoPlugin({
      sourceMap: false,
      cssnanoOptions: {
        preset: [
          'default',
          {
            mergeLonghand: false,
            cssDeclarationSorter: false
          }
        ]
      }
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}
