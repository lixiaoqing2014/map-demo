const PAGE_SIZE = 7
const CURRENT_PAGE = 1
const ALL_STATUS = 4
const REASON_OPTIONS = [
  {
    label: "综合",
    value: 1
  },
  {
    label: "大气环境",
    value: 2
  },
  {
    label: "水环境",
    value: 3
  },
  {
    label: "固废",
    value: 4
  },
  {
    label: "辐射",
    value: 5
  },
  {
    label: "噪声",
    value: 6
  },
  {
    label: "生态环境",
    value: 7
  },
  {
    label: "其他",
    value: 8
  }
]
const STATUS_OPTIONS = [
  {
    label: "已处理",
    value: 3,
    checked: false
  },
  {
    label: "未处理",
    value: 0,
    checked: false
  },
  {
    label: "处理中",
    value: 1,
    checked: false
  },
  {
    label: "不受理",
    value: 2,
    checked: false
  },
]
const STATUS_COMPLETED = STATUS_OPTIONS[0].value
const STATUS_PENDDING = STATUS_OPTIONS[1].value

export default {
  PAGE_SIZE,
  CURRENT_PAGE,
  ALL_STATUS,
  REASON_OPTIONS,
  STATUS_OPTIONS,
  STATUS_COMPLETED,
  STATUS_PENDDING
}