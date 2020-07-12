<template>
  <div class="card-wrap">
    <h3 :id="title" class="title" :title="title">
      <a :href="'#' + title" class="header-anchor">#</a>
      <a :href="'#' + title" class="title-name">{{ title }}</a>
    </h3>
    <div class="description" v-if="description" v-html="description"></div>
    <el-table :data="data" v-if="type">
      <el-table-column
        v-for="item in table"
        :key="item.prop"
        :prop="item.prop"
        :width="item.width"
        :label="item.label"
      >
        <template v-slot="{ row }">
          <template v-if="item.prop === 'desc'">
            <span class="word" v-html="row[item.prop]"></span>
          </template>
          <template v-else>
            <span class="word">{{ row[item.prop] || '—' }}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    type: String,
    description: String,
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      attrTable: [
        {
          prop: 'name',
          label: '参数',
          width: '150'
        },
        {
          prop: 'desc',
          label: '描述'
        },
        {
          prop: 'type',
          label: '类型',
          width: '200'
        },
        {
          prop: 'optional ',
          label: '可选值',
          width: '120'
        },
        {
          prop: 'default',
          label: '默认值',
          width: '80'
        }
      ],
      methodsTable: [
        {
          label: '方法名',
          prop: 'name',
          width: '150'
        },
        {
          label: '说明',
          prop: 'desc'
        },
        {
          label: '参数',
          prop: 'params'
        }
      ],
      eventTable: [
        {
          prop: 'name',
          label: '事件名称',
          width: '150'
        },
        {
          prop: 'desc',
          label: '说明'
        },
        {
          prop: 'params',
          label: '回调参数'
        }
      ],
      slotTable: [
        {
          prop: 'name',
          label: 'name',
          width: '150'
        },
        {
          prop: 'desc',
          label: '说明'
        }
      ]
    }
  },
  computed: {
    table() {
      return this[`${this.type}Table`]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.card-wrap {
  margin-top: 30px;

  .title {
    margin: 0;
    margin-top: -3.1rem;
    padding-top: 4.6rem;

    &-name {
      color: inherit;
      text-decoration: none !important;
    }
  }

  .word {
    word-wrap: break-word;
    word-break: normal;
  }
  .description {
    font-size: 14px;
    display: block;
    margin: 10px 0;
    color: #5e6d82;
  }
}
::v-deep {
  .el-table tbody tr:hover > td {
    background-color: #ffffff !important;
  }
}
</style>
