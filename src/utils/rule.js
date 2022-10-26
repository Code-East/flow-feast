import { reactive } from 'vue'
//username的表单规则
const validatePass = (rule, value, callback) => {
    const mailRef = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    if (value === "") {
      callback(new Error("请输入用户邮箱账号进行登入"));
    } else if (!mailRef.test(value)) {
      callback(new Error("请输入正确的邮箱"));
    } else {
      callback();
    }
  };
  

//登入表单的规则验证
export const loginRules = reactive({
    username: [{ validator: validatePass, trigger: "blur" }],
    psw:[ 
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 5, max: 10, message: '密码必须到5~10位之间', trigger: 'blur' },
    ],
    code:[
      { required: true, message: '请输入验证码', trigger: 'blur' },
    ]
});
