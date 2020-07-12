<template>
  <div>
    <common-attribute
      title="Attributes"
      type="attr"
      :data="attrData"
    ></common-attribute>
    <common-attribute
      title="Events"
      type="event"
      :data="eventData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrData: [
        {
          name: 'value/v-model',
          desc: `车牌号码`,
          type: 'string'
        }
      ],
      eventData: [
        {
          name: 'change',
          desc: `车牌号改变时触发事件`,
          type: 'string',
          params: '(value: string)'
        }
      ]
    }
  }
}
</script>
