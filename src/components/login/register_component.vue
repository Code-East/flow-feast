<script setup>
import { ref, reactive, computed } from "vue";
import { get_code_api, register_api } from "@/api/user";
import { ElMessage } from "element-plus";
let msg;
const codeExist = ref(false);
const timeCount = ref(60);
const mailRef = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
const btnShow = computed(() => {
  return codeExist.value ? timeCount.value + "后重新获取" : "获取验证码";
});
const getCode = async () => {
  if (formData.username === "" || !mailRef.test(formData.username)) {
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "请输入正确的邮箱账号！"
    });
    return;
  }
  const res = await get_code_api(formData.username);
  if (res.code == 0) {
    msg = ElMessage({
      type: "success",
      message: "发送成功"
    });
  } else {
    msg = ElMessage({
      type: "error",
      message: "发送失败"
    });
  }

  codeExist.value = !codeExist.value;
  let timer = setInterval(() => {
    if (timeCount.value <= 0) {
      clearInterval(timer);
      timeCount.value = 60;
      codeExist.value = false;
    }
    timeCount.value--;
  }, 1000);
};

//表单校验相关
const ruleFormRef = ref();
//username的表单规则
const formData = reactive({
  username: "",
  psw: "",
  checkPsw: "",
  code: "",
  userType: "0"
});

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户邮箱账号进行登入"));
  } else if (!mailRef.test(value)) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
};

//重复密码
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== formData.psw) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};

//登入表单的规则验证
const registerRules = reactive({
  username: [{ validator: validatePass, trigger: "blur" }],
  psw: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 10, message: "密码必须到5~10位之间", trigger: "blur" }
  ],
  checkPsw: [{ validator: validatePass2, trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const submitForm = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      const res = await register_api(formData);
      if (res.code === 0) {
        msg = ElMessage({
          type: "success",
          message: "注册成功，请前往登入！"
        });
      }
      formData.username = '';
      formData.psw = '';
      formData.checkPsw = '';
      formData.code = '',
      formData.userType = '0';

    } else {
      if (msg) {
        msg.close();
      }
      msg = ElMessage({
        type: "warning",
        message: "请将信息填写正确！！！"
      });

      return false;
    }
  });
};
</script>

<template>
  <el-form
    ref="ruleFormRef"
    class="form"
    :model="formData"
    label-position="top"
    :rules="registerRules"
    @keydown.enter="submitForm(ruleFormRef)"
  >
    <el-form-item label="用户名" prop="username">
      <el-input placeholder="请输入用户名" v-model="formData.username"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="psw">
      <el-input type="password" placeholder="请输入密码" show-password v-model="formData.psw"></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPsw">
      <el-input  type="password" placeholder="请再次输入密码" show-password v-model="formData.checkPsw"></el-input>
    </el-form-item>

    <el-form-item label="验证码" prop="code">
      <el-input v-model="formData.code" placeholder="输入验证码" class="input-with-select">
        <template #append>
          <el-button @click="getCode" :disabled="codeExist">{{btnShow}}</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="用户类型">
      <el-radio-group v-model="formData.userType">
        <el-radio label="0">个人用户</el-radio>
        <el-radio label="1">宴席团队</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button
        class="login_btn"
        color="#f39c12"
        type="primary"
        round
        size="large"
        @click="submitForm(ruleFormRef)"
      >注册</el-button>
    </el-form-item>
  </el-form>
</template>


<style scoped lang="scss">
.form {
  width: 90%;
  margin-top: 10px;
  div {
    font-size: 14px;
  }
  .login_btn {
    width: 100%;
    font-weight: bold;
    color: white;
  }
  span:hover {
    cursor: pointer;
  }
  .to_register {
    color: #ccc;
    font-size: 14px;
    text-decoration: none;
    float: right;
    &:hover {
      color: blue;
    }
  }
}
</style>