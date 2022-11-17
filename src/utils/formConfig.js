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