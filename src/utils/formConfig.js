//员工表单
export const employeeFormConfig = [
    {
        field: "employ_pic",
        type: "upload",
        label: "头像",
        savePath: '/feast/employ_pic',
    },
    {
        field: "name",
        type: "input",
        label: "名称",
        placeholder: "请输入名称",

    },
    {
        field: "age",
        type: "input",
        label: "年龄",
        placeholder: "请输入年龄",
    },
    {
        field: "sex",
        type: "radio",
        label: "性别",
    },
    {
        field: "health_card",
        type: "upload",
        label: "健康证",
        savePath: '/feast/health_card',
        style: {
            width: 250 + 'px',
            height: 125 + 'px',
            borderRadius: 0 + 'px',
            display: 'flex',
            justifyContent: 'center'
        }
    },
    {
        field: "position",
        type: "select",
        label: "职位",
        options: [
            { label: '厨师', value: 0 },
            { label: '切菜', value: 1 },
            { label: '打杂', value: 2 },
            { label: '端菜', value: 3 }
        ]
    }
];
//查看宴席表单
export const feastFormConfig = [
    {
        field: "nickname",
        label: "发布人",
    },
    {
        field: "scale",
        label: "宴席规格",
    },
    {
        field: "price",
        label: "价位",
    },
    {
        field: "address",
        label: "地址",
    },
    {
        field: "date_time",
        label: "举办时间",
    },
    {
        field: "status",
        label: "状态",
    },
    {
        field: "description",
        label: "描述",
    },
];
//完成表单结构
export const completeFeastFormConfig = [
    {
        field: "nickname",
        label: "发布人",
    },
    {
        field: "scale",
        label: "宴席规格",
    },
    {
        field: "price",
        label: "价位",
    },
    {
        field: "address",
        label: "地址",
    },
    {
        field: "date_time",
        label: "举办时间",
    },
    {
        field: "status",
        label: "状态",
    },
    {
        field: "environment",
        type: "upload",
        label: "环境拍照",
        savePath: '/feast/environment',
        style: {
            width: 250 + 'px',
            height: 125 + 'px',
            borderRadius: 0 + 'px',
            display: 'flex',
            justifyContent: 'center'
        }
    },
];
//宴席团队表单
export const teamMessageFormConfid = [
    {
        field: 'teampic',
        type: 'image',
        label: '团队图片',
        style: {
            width: 250 + 'px',
            height: 125 + 'px',
        }
    },
    {
        field: 'tname',
        label: '团队名称'
    },
    {
        field: 'address',
        label: '团队地址',
    },
    {
        field: 'create_time',
        label: '创建时间'
    },
    {
        field: 'team_scale',
        label: '团队规模'
    },
    {
        field: 'team_price',
        label: '价位'
    },
    {
        field: 'team_introduction',
        label: '团队简介'
    },
    {
        field: 'business_license',
        type: 'image',
        label: '营业执照',
        style: {
            width: 400 + 'px',
            height: 200 + 'px',
        }
    }
]
//查看员工表单
export const checkEmployeeFormConfig = [
    {
        field: 'employ_pic',
        type: 'image',
        label: '头像',
        style: {
            width: 100 + 'px',
            height: 100 + 'px',
            borderRadius: 50 + 'px'
        }
    },
    {
        field: 'name',
        label: '名称'
    },
    {
        field: 'sex',
        label: '性别'
    },
    {
        field: 'age',
        label: '年龄'
    },
    {
        field: 'position',
        label: '职位'
    },
    {
        field: 'health_card',
        label: '健康证',
        type: 'image',
        style: {
            width: 300 + 'px',
            height: 150 + 'px',
        }
    },
]
//宴席下单表单结构
export const buyFeastFormConfig = [
    {
        field: 'date_time',
        type: 'date',
        label: '举办日期',
        disable: false
    },
    {
        field: 'scale',
        type: 'number',
        label: '宴席规格',
        disable: false
    },
    {
        field: 'price',
        label: '价格',
        disable: false
    },
    {
        field: 'address',
        type: 'address',
        label: '地址',
        disable: false
    },
    {
        field: 'street',
        type: 'input',
        label: '街道',
        placeholder: '请输入街道',
        disable: false
    },
    {
        field: 'description',
        type: 'textarea',
        label: '描述',
        placeholder: '请输入描述',
        disable: false
    },
]
//退款
export const refundFormConfig = [
    {
        field: 'refund_type',
        type: 'select',
        label: '退款原因',
        options: [
            { label: '未办理', value: 0 },
            { label: '办理脏乱差', value: 1 },
            { label: '服务质量差', value: 2 }
        ]
    },
    {
        field: 'refund_context',
        type: 'textarea',
        label: '描述',
        style:{
            height:200 + 'px'
        }
    },
]
//查看宴席表单
export const teamCheckFeastConfig = [
    {
        field: "nickname",
        label: "发布人",
    },
    {
        field: "scale",
        label: "宴席规格",
    },
    {
        field: "price",
        label: "价位",
    },
    {
        field: "address",
        label: "地址",
    },
    {
        field: "date_time",
        label: "举办时间",
    },
    {
        field: "description",
        label: "描述",
    },
];