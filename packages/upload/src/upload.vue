<template>
  <el-upload
    v-bind="$attrs"
    ref="upload"
    class="uploader"
    :class="{ 'hide-upload-btn': uploadedLength >= limit }"
    :disabled="disabled"
    :action="uploadUrl"
    :on-remove="handleOnRemove"
    :on-success="handleOnSuccess"
    :on-preview="onPreview"
    :on-progress="handleProgress"
    :file-list="uploadFileList"
    :name="name"
    :limit="reUploadIndex > -1 ? limit + 1 : limit"
    list-type="picture-card"
  >
    <el-row
      type="flex"
      justify="center"
      align="middle"
      class="uploader-icon"
      :style="contentStyle"
      ><i class="el-icon-plus"
    /></el-row>
    <template #file="{ file }">
      <audio
        :style="contentStyle"
        :src="file.url"
        v-if="formatterMediaType(file) === 'audio'"
      />
      <video
        :style="contentStyle"
        :src="file.url"
        v-else-if="formatterMediaType(file) === 'video'"
      />
      <img :style="contentStyle" :src="file.url" :alt="file.name" v-else />
      <label class="el-upload-list__item-status-label">
        <i class="el-icon-upload-success el-icon-check" />
      </label>
      <el-progress
        v-if="file.status === 'uploading'"
        :style="{ width: `${progressWidth * 0.8}px` }"
        :width="progressWidth * 0.8"
        :type="'circle'"
        :stroke-width="6"
        :percentage="parsePercentage(file.percentage)"
      />
      <div v-if="preview || !disabled" class="el-upload-list__item-actions">
        <span v-if="preview" class="el-upload-list__item-preview">
          <i
            class="el-icon-zoom-in"
            title="预览"
            @click="handlePreview(file)"
          />
        </span>
        <span v-if="!disabled" class="el-upload-list__item-preview">
          <i
            class="el-icon-refresh"
            title="替换"
            @click="handleReUpload(file)"
          />
        </span>
        <span v-if="!disabled" class="el-upload-list__item-delete">
          <i
            class="el-icon-delete"
            title="删除"
            @click="handleRemove(file, file.raw)"
          />
        </span>
      </div>
    </template>
  </el-upload>
</template>

<script lang="tsx">
/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:03:50
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-04-29 13:33:16
 */
import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { ElUpload, ElUploadInternalFileDetail } from 'element-ui/types/upload'
import emitter from 'element-ui/src/mixins/emitter'
import {
  FileDetail,
  Remove,
  Success,
  Preview
} from '@autodt/fnb-element-ui/types/upload'
import { difference, isEqual } from 'lodash'

@Component({
  name: 'FnbUpload',
  components: {},
  inheritAttrs: false,
  mixins: [emitter]
})
export default class Upload extends Vue {
  /** url 集合 */
  @Prop({ type: [Array, String], default: '' }) readonly value!:
    | string[]
    | string

  /** 宽度 */
  @Prop({ type: Number, default: 100 }) readonly width!: number
  /** 高度 */
  @Prop({ type: Number, default: 100 }) readonly height!: number

  /** 是否禁止选择 */
  @Prop(Boolean) readonly disabled!: boolean

  /** 上传的地址 */
  @Prop(String) readonly action!: string

  /** 是否显示预览 */
  @Prop({ type: Boolean, default: true }) readonly preview!: boolean

  /** 上传的文件字段名 */
  @Prop({ type: String, default: 'image' }) readonly name!: string

  /** 上传的文件列表, 例如: `[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]` */
  @Prop({ type: Array, default: () => [] })
  readonly fileList!: ElUploadInternalFileDetail[]

  @Prop({ type: Function }) readonly onRemove!: Remove

  @Prop({ type: Function }) readonly onSuccess!: Success

  @Prop({ type: Function }) readonly onPreview!: Preview

  /** 最大允许上传个数 */
  @Prop(Number) readonly limit!: number

  /** 已上传数量 */
  uploadedLength = 0

  /** 重新上传的索引 */
  reUploadIndex = -1

  /** 文件上传 */
  uploadFileList: FileDetail[] = []

  get contentStyle() {
    return { width: `${this.width}px`, height: `${this.height}px` }
  }

  /** 进度 圆的宽度 */
  get progressWidth() {
    return Math.min(this.height, this.width)
  }

  get uploadUrl() {
    return this.action ?? this.UPLOAD_URL
  }

  @Ref('upload') readonly uploadRef!: ElUpload

  @Watch('fileList', { immediate: true })
  onFileList(list: FileDetail[]) {
    this.uploadFileList = [...list]
    const value = Array.isArray(this.value)
      ? this.value
      : (this.value || null)?.split(',') ?? []
    const urlSet = new Set<string>([
      ...list.map(v => v.response?.data?.url ?? v.url!).filter(v => !!v),
      ...value
    ])
    this.emitInput([...urlSet])
  }

  @Watch('value', { immediate: true })
  watchValue(val: string | string[]) {
    const list = Array.isArray(val)
      ? val
      : val?.split(',').filter(v => !!v) ?? []
    const oldList = this.uploadFileList.map(
      v => v?.response?.data?.url ?? v.url
    )
    if (list.length === 0 && oldList.length !== 0) {
      this.uploadFileList = []
    } else if (!isEqual(list, oldList)) {
      if (list.length < oldList.length) {
        const diffList = difference(oldList, list)
        oldList.forEach((v, index) => {
          if (diffList.includes(v)) {
            this.uploadFileList.splice(index, 1)
          }
        })
      } else if (list.length > oldList.length) {
        const diffList = difference(list, oldList)
        list.forEach(v => {
          if (diffList.includes(v)) {
            this.uploadFileList.push({ url: v } as FileDetail)
          }
        })
      } else {
        const diffList = difference(list, oldList)
        list.forEach((v, index) => {
          if (diffList.includes(v)) {
            this.uploadFileList.splice(index, 1, { url: v } as FileDetail)
          }
        })
      }
    }
    // form 表单校验
    ;(this as any).dispatch('ElFormItem', 'el.form.change', [val])
  }

  @Emit('input')
  emitInput(list: string[]) {
    list = list.filter(v => !!v)
    this.uploadedLength = list.length
    return Array.isArray(this.value) ? list : list.join()
  }

  /** 是否是图片 */
  testImage(url: string) {
    return /^.*(\.(png|jpg|jpeg|gif))$/i.test(url)
  }

  /** 是否是视频 */
  testVideo(url: string) {
    return /^.*(\.(avi|rmvb|mp4|rm|wmv))$/i.test(url)
  }

  /** 是否是音频*/
  testAudio(url: string) {
    return /^.*(\.(mp3|ape|flac|wma))$/i.test(url)
  }

  /** 判断媒体类型 */
  formatterMediaType(file: any) {
    const type = file.type ?? file.raw?.type
    if (type) {
      return type?.split('/')?.[0]
    }
    const url = ((file?.response?.data?.url ?? file.url) as string).split(
      '?'
    )[0]

    if (this.testImage(url)) {
      return 'image'
    } else if (this.testVideo(url)) {
      return 'video'
    } else if (this.testAudio(url)) {
      return 'audio'
    }
  }

  handleRemove(file: any, raw: any) {
    ;(this.uploadRef as any).handleRemove(file, raw)
  }

  handleOnSuccess(response: any, file: FileDetail, fileList: FileDetail[]) {
    this.uploadFileList = fileList
    this.emitInput(fileList.map(v => v?.response?.data?.url ?? v.url!))
    this.onSuccess?.(response, file, fileList)
  }

  handleOnRemove(file: FileDetail, fileList: FileDetail[]) {
    this.uploadFileList = fileList
    this.emitInput(fileList.map(v => v?.response?.data?.url ?? v.url!))
    this.onRemove?.(file, fileList)
  }

  /** 预览 */
  handlePreview(file: any) {
    // 有自定义预览，只使用自定义预览
    if (this.onPreview) {
      this.onPreview(file)
      return
    }
    const style =
      'display:block; margin:0 auto; max-width:100%; max-height:calc(100vh - 137.6px)'
    let message = `<img src="${file.url}" style="${style}" />`
    const type = this.formatterMediaType(file)
    if (type === 'video') {
      message = `<video autoplay controls src="${file.url}" style="${style}" />`
    } else if (type === 'audio') {
      message = `<audio autoplay controls src="${file.url}" style="${style}" />`
    }
    this.$msgbox({
      title: '预览',
      message,
      dangerouslyUseHTMLString: true,
      showConfirmButton: false
    })
  }

  /** 处理重新上传 */
  handleReUpload(file: any) {
    this.reUploadIndex = this.uploadFileList.findIndex(v => v.uid === file.uid)
    const fileEl = this.uploadRef.$el.querySelector(
      'input[name="image"]'
    ) as HTMLInputElement
    fileEl?.click()
  }

  /** 处理上传进度 */
  handleProgress(event: any, file: any) {
    if (this.reUploadIndex > -1) {
      this.uploadFileList.splice(this.reUploadIndex, 1, file)
      this.reUploadIndex = -1
    }
  }

  parsePercentage(val: string) {
    return parseInt(val, 10)
  }

  /** 清空已上传的文件列表（该方法不支持在 before-upload 中调用） */
  clearFiles() {
    this.uploadRef.clearFiles()
  }

  /** 取消上传请求 */
  abort(file: ElUploadInternalFileDetail) {
    this.uploadRef.abort(file)
  }

  /** 手动上传文件列表 */
  submit() {
    this.uploadRef.submit()
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  img,
  video,
  audio {
    display: block;
  }

  &-icon {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    font-size: 20px;
    color: #8c939d;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
      border-color: #409eff;
    }
  }

  ::v-deep {
    .el-upload {
      width: auto;
      height: auto;
      line-height: inherit;
      margin: 0 8px 8px 0;
    }

    .el-upload-list--picture-card {
      width: auto;
      height: auto;
      line-height: inherit;

      .el-upload-list__item {
        width: auto;
        height: auto;
        vertical-align: top;
      }
    }
  }

  &-image {
    width: 100%;
    height: 100%;
  }

  &.hide-upload-btn ::v-deep {
    .el-upload {
      display: none;
    }
  }
}

.progress {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
