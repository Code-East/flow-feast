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
];

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