export let config = {
  header: {
    btnText: '创建需求',
    search: {
      placeholder: '搜索需求'
    }
  },
  select: {
    time: [
      {
        id: 'time-select-0',
        label: '按默认时间排序',
        value: '0'
      },
      {
        id: 'time-select-1',
        label: '升序排列',
        value: '2'
      },
      {
        id: 'time-select-2',
        label: '降序排列',
        value: '1'
      }
    ],
    status: [
      {
        id: 'status-select-0',
        label: '全部需求单',
        value: '0'
      },
      {
        id: 'status-select-1',
        label: '处理中',
        value: '1'
      },
      {
        id: 'status-select-2',
        label: '已完成',
        value: '2'
      },
      {
        id: 'status-select-1',
        label: '已拒绝',
        value: '3'
      }
    ]
  },
  shotMode: [
    '地面',
    '空中'
  ]
}
