<template>
  <div id="app">
    <FnbAppContainer>
      <!-- <FormDemo /> -->
      <FnbSearchForm :listItems="formItems" :init-form="initform" />
      <FnbForm v-model="form" :cols="3">
        <FnbFormItem :listItems="formItems" />
      </FnbForm>
      <FnbTable
        ref="table"
        :table="table"
        row-key="date"
        autoMaxHeight
        storageSortKey="storageSortKey3333"
        :fetchApi="getList"
      >
        <template v-slot:date="{ row }">
          <el-input v-model="row.date" />
        </template>
        <template v-slot:name="{ row }">
          <el-input v-model="row.name" />
        </template>
        <template v-slot:nameHeader> {{ 'row.name' }} </template>
        <template v-slot:append> <div>656565656</div> </template>
        <template v-slot:paginationAppend> <div>656565656</div> </template>
        <template #headerActions>
          <fnb-table-button>545headerActions</fnb-table-button>
          <fnb-table-button>545headerActions</fnb-table-button>
          <fnb-table-button>545headerActions</fnb-table-button>
        </template>
      </FnbTable>
      <FnbTable
        :table="table"
        :data="tableData"
        row-key="date"
        :total="66"
        storageSortKey="storageSortKey33"
        show-table-top
      >
        <template v-slot:date="{ row }">
          <el-input v-model="row.date" />
        </template>
        <template v-slot:name="{ row }">
          <el-input v-model="row.name" />
        </template>
        <template v-slot:nameHeader> {{ 'row.name' }} </template>
        <template v-slot:append> <div>656565656</div> </template>
        <template v-slot:paginationAppend> <div>656565656</div> </template>
        <template #headerActions>
          <fnb-table-button>545headerActions</fnb-table-button>
          <fnb-table-button>545headerActions</fnb-table-button>
          <fnb-table-button>545headerActions</fnb-table-button>
        </template>
      </FnbTable>
      <FnbUpload
        accept="image/png,image/jpeg"
        :limit="4"
        v-model="urlList.url"
        :beforeUpload="handleUploadBefore"
        :fileList="fileListB"
        action="http://qw-admin.yunchefu.cn/oss/image/toOss"
      />
      <el-button v-clipboard="'copy'" v-clipboard:success="copySuccess"
        >复制</el-button
      >
      <el-button @click="fileList.push({ url: fileList[0].url, type: 'image' })"
        >增加</el-button
      >
      <FnbSearchContainer>
        <el-form label-width="auto" ref="formUpload" :model="form">
          <el-form-item
            label="6894"
            :rules="{ required: true, message: '4545', trigger: 'change' }"
            prop="abc1"
          >
            <FnbUpload
              accept="image/png,image/jpeg"
              :limit="1"
              v-model="form.abc1"
              :beforeUpload="handleUploadBefore"
              action="http://qw-admin.yunchefu.cn/oss/image/toOss"
            />
          </el-form-item>
          <el-form-item label="6894222">
            <el-input v-model="abc1" />
          </el-form-item>
          <el-form-item label="689411">
            <el-input v-model="abc2" />
          </el-form-item>
          <el-button @click="validate">验证</el-button>
        </el-form>
      </FnbSearchContainer>
      <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
      <fnb-amount-input v-model="amount" @input="amountInput" :max="9.3" />
      <fnb-date-range v-model="date" valueTime showBtns :max-width="350" />
      <fnb-plate-number v-model="plateNumber" @change="plateInput" />
      <fnb-iconfont
        name="icon-xinkehu"
        size="50"
        @click="disabled = !disabled"
      />
      <!-- <fnb-select-goods
        v-model="name"
        row-key="id"
        :input-disabled="disabled"
        :table="table"
        :tableData="tableData"
        :tabList="tabList"
        show-tab
        showPagination
        trigger="click"
        :showCancle="true"
        :showConfirm="true"
        :tab-active.sync="tabActive"
        :selection.sync="sectionList"
        :total="50"
        :page-size="10"
        :current-page="1"
        @current-change="this.handleCurrentChange"
        @size-change="this.handleSizeChange"
      >
        <template v-slot:reference>
          <el-button>点击</el-button>
        </template>
      </fnb-select-goods> -->

      <!-- <el-button @click="clearSelection">clearSelection</el-button> -->
    </FnbAppContainer>
  </div>
</template>

<script lang="tsx">
import { FormItemProps } from '@autodt/fnb-element-ui/types/form-item'
import { ElForm } from 'element-ui/types/form'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormItemType } from '../src/enum/form-item'

import { FnbTable, FnbTableColumn } from '../types/table'

@Component({
  components: {}
})
export default class App extends Vue {
  form: any = {}
  initform: any = {
    checkbox: false
  }
  disabled = false
  date = []
  pageNum = 1
  pageSize = 10
  total = 105
  amount = 0
  abc = ''
  abc1 = ''
  abc2 = ''
  fileList = [
    {
      url:
        'https://syautodt.oss-cn-shanghai.aliyuncs.com/test/image/1c1299c2-b137-4e59-8b91-d8ce8e54b5c4.jpg',
      type: 'image'
    },
    {
      url:
        'https://syautodt.oss-cn-shanghai.aliyuncs.com/test/image/ec2de6b5-26a0-4154-a49d-8fbfcd7aa72b.png'
    }
  ]

  fileListB: any = []

  urlList: any = {}

  renderLabel() {
    return <div>3333333</div>
  }

  get filesList() {
    return this.urlList.url ? [{ url: this.urlList.url }] : []
  }

  get formItems() {
    return this.formItems1()
  }

  @Ref('formUpload') readonly formUploadRef!: ElForm

  validate() {
    console.log(this)
    ;(this.$refs.formUpload as ElForm).validate()
  }

  formItems1(): FormItemProps[] {
    return [
      {
        formType: FormItemType.INPUT,
        type: 'phone',
        itemLabel: '陈超',
        itemLabelDesc: '不能选择今天',
        key: '666',
        prop: 'edit1.edit',
        prefixIcon: 'el-icon-edit',
        onInput(e) {
          console.log(e)
        },
        clearable: true,
        required: true
      },
      {
        formType: FormItemType.AMOUNT_INPUT,
        itemLabel: '不能选择今天',
        itemLabelDesc: '（不能选择今天不能选择今天不能选择今天不能选择今天）',
        itemLabelPosition: 'top',
        prop: 'amount',
        renderSuffix() {
          return '万元'
        }
      },
      {
        field: 'edit2',
        itemLabel: '陈超234',
        formType: FormItemType.AUTOCOMPLETE
      },
      {
        field: 'edit3',
        itemLabel: '陈超234',
        textAlign: 'left',
        formType: FormItemType.INPUT_NUMBER
      },
      {
        formType: FormItemType.RENDER_FORM_CONTENT,
        field: 'render',
        itemLabel: '66666',
        render: form => {
          return <el-input v-model={form.render} />
        }
      },
      {
        formType: FormItemType.SELECT,
        prop: 'select',
        multiple: true,
        outputType: 'string',
        clearable: true,
        itemLabel: '选择',
        optionList: [
          {
            label: '444',
            value: '222'
          },
          {
            label: '222',
            value: '444'
          }
        ],
        required: true
      },
      {
        formType: FormItemType.DATE_PICKER,
        prop: 'date',
        field: ['startDate', 'endDate'],
        type: 'datetimerange',
        dateLimit: 5,
        endToday: true,
        itemLabel: '小于今天',
        pickerShortcuts: true,
        unlinkPanels: true,
        isExcludeToday: true
      },
      {
        formType: FormItemType.DATE_PICKER,
        prop: 'datetimerange',
        field: ['startTime', 'endTime'],
        type: 'datetimerange',
        dateLimit: { limit: 2, type: 'month' },
        startToday: true,
        itemLabel: '大于今天',
        onChange(e) {
          console.log(e)
        }
      },
      {
        formType: FormItemType.TIME_PICKER,
        prop: 'timepicker',
        field: ['startTime', 'endTime'],
        isRange: true,
        onChange(e) {
          console.log(e)
        }
      },
      {
        formType: FormItemType.TIME_SELECT,
        prop: 'timeselect',
        field: ['startTime1', 'endTime1'],
        isRange: true,
        onChange(e) {
          console.log(e)
        }
      },
      {
        formType: FormItemType.TIME_SELECT,
        prop: 'timeselect1',
        field: 'startTime3',
        onChange(e) {
          console.log(e)
        }
      },
      {
        formType: FormItemType.INPUT_NUMBER,
        itemLabel: '数字',
        prop: 'inputnumber1',
        placeholder: '555'
      },
      {
        formType: FormItemType.SWITCH,
        itemLabel: '开关',
        prop: 'switch'
      },
      {
        formType: FormItemType.CHECKBOX,
        itemLabel: 'checkbox',
        prop: 'checkbox',
        render() {
          return '55'
        }
      },
      {
        formType: FormItemType.CHECKBOX_GROUP,
        itemLabel: 'checkboxGroup',
        prop: 'checkboxGroup',
        checkboxList: [
          {
            label: 1,
            render() {
              return '333'
            }
          },
          {
            label: 2,
            render() {
              return '3366'
            }
          }
        ]
      },
      {
        formType: FormItemType.CASCADER,
        itemLabel: '级联',
        prop: 'Cascader',
        multiple: true,
        clearable: true,
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [
                  {
                    value: 'yizhi',
                    label: '一致'
                  },
                  {
                    value: 'fankui',
                    label: '反馈'
                  },
                  {
                    value: 'xiaolv',
                    label: '效率'
                  },
                  {
                    value: 'kekong',
                    label: '可控'
                  }
                ]
              }
            ]
          }
        ],
        getCheckedNodes(e) {
          console.log(7777, e)
        }
      }
      // {
      //   formType: FormItemType.UPLOAD,
      //   itemLabel: '上传图片',
      //   action: 'http://qw-admin.yunchefu.cn/oss/image/toOss',
      //   prop: 'upload',
      //   fileList: this.fileList
      // }
    ]
  }

  cellMouseEnter() {
    console.log('cellMouseEnter')
  }

  async getList() {
    console.log(this)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: {
            total: 20,
            records: this.tableData
          }
        })
      }, 2000)
    })
  }
  tabList = [
    {
      label: '服务',
      value: '1'
    },
    {
      label: '商品',
      value: '2'
    }
  ]
  plateNumber = '皖BHT215'
  name = ''
  get table(): FnbTableColumn[] {
    return [
      {
        minWidth: 500,
        type: 'selection'
      },
      {
        label: '日期',
        prop: 'date',
        minWidth: 500,
        render: () => {
          return <div>2365</div>
        }
      },
      {
        slot: 'name',
        prop: 'name',
        minWidth: 500,
        sortable: true,
        label: '姓名'
      },
      {
        prop: 'name2',
        minWidth: 500,
        label: '姓名2'
      },
      {
        prop: 'address',
        minWidth: 500,
        label: '地址',
        showOverflowTooltip: true
      }
    ]
  }
  sectionList = []

  tabActive = '2'

  tableData = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 '
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address:
        '上海市普陀区金沙江路 1516 弄上海市普陀区金沙江路弄上海市普陀区金沙江路弄上海市普陀区金沙江路弄上海市普陀区金沙江路 1516 弄上海市普陀区金沙江路 1516 弄上海市普陀区金沙江路 1516 弄'
    }
  ]

  pickerOptions = {
    onPick(e: any) {
      console.log(e)
    }
  }

  @Ref('table') readonly tableRef!: FnbTable

  mounted() {
    this.$set(this.tableData, '[0].name', '4')
    console.log(this.$refs)
    setTimeout(() => {
      this.tableData.push({
        date: '2017-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      })
      this.fileList.push({ url: this.fileList[0].url, type: 'image' })
      this.fileListB = [
        {
          url:
            'https://syautodt.oss-cn-shanghai.aliyuncs.com/test/image/1c1299c2-b137-4e59-8b91-d8ce8e54b5c4.jpg',
          type: 'image'
        },
        {
          url:
            'https://syautodt.oss-cn-shanghai.aliyuncs.com/test/image/ec2de6b5-26a0-4154-a49d-8fbfcd7aa72b.png'
        }
      ]
      this.form.edit1.edit = 365
    }, 3000)
  }

  clearSelection() {
    this.tableRef.clearSelection()
  }

  copySuccess() {
    this.$message.success('复制成功')
  }

  cellClick(e: any) {
    console.log(e)
  }

  plateInput(e: string) {
    console.log(e)
  }

  amountInput(e: string) {
    console.log(e)
  }

  /** 处理上传之前的操作 */
  handleUploadBefore(file: any) {
    console.log(file)
    return true
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
