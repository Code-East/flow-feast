//员工表格结构
export const employeeTableConfig = [
  {
    prop: "name",
    label: "姓名",
    width: "135"
  },
  {
    prop: "age",
    label: "年龄",
    width: "135"
  },
  {
    prop: "sex",
    label: "性别",
    width: "135"
  },
  {
    prop: "position",
    label: "职位",
    width: "135"
  }
];

//订单表结构
export const orderTableConfig = [
  {
    prop: "feast_id",
    label: "对应宴席",
    width: "135",
    fixed:'left'
  },
  {
    prop: "tname",
    label: "承接方",
    width: "135"
  },
  {
    prop: "nickname",
    label: "办理方",
    width: "135"
  },
  {
    prop: "goods_count",
    label: "数量(桌)",
    width: "100"
  },
  {
    prop: "price",
    label: "总金额",
    width: "135"
  },
  {
    prop: "pay_time",
    label: "付款时间",
    width: "200"
  },
  {
    prop: "order_status",
    label: "订单状态",
    width: "100",
  },
]