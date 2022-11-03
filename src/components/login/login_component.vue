<script setup>
import { login_api, get_code_api } from "@/api/user";
import { ref, reactive, computed } from "vue";
import { loginRules } from "@/utils/rule.js";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/user_store";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();
//定义消息框
let msg;
const mailRef = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
//是否发送过验证码
const codeExist = ref(false);
//倒计时
const timeCount = ref(60);
//按钮显示的文字
const btnShow = computed(() => {
  return codeExist.value ? timeCount.value + "后重新获取" : "获取验证码";
});
//点击获取验证码
const getCode = async () => {
  //调用获取验证api
  try {
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
    }else{
      console.log(res);
      msg = ElMessage({
        type: "error",
        message: "发送失败"
      });
      return;
    }
    //改变状态
    codeExist.value = !codeExist.value;
    //开启倒计时
    let timer = setInterval(() => {
      if (timeCount.value <= 0) {
        clearInterval(timer);
        timeCount.value = 60;
        codeExist.value = false;
      }
      timeCount.value--;
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

//表单相关
const ruleFormRef = ref();
const formData = reactive({
  username: "",
  psw: "",
  code: "",
  userType: "0"
});

//点击登入按钮
const loginClick = async formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      try {
        //登入求请
        const res = await login_api(formData);
        if (res.code === 0) {
          msg = ElMessage({
            type: "success",
            message: "登录成功"
          });
          //存入store
          store.$patch({
            userinfo: res.userinfo,
            token: res.token
          });
          //将token和userinfo存入浏览器
          localStorage.setItem('userinfo',JSON.stringify(res.userinfo));
          localStorage.setItem('token',res.token);
          
          //跳转
          if(formData.userType === '0'){
            router.push('/index/feast_team_page');
          }else if (formData.userType === '1') {
            router.push('/index/feast_list_page');
          }else{
            msg = ElMessage({
              type:'error',
              message:'用户类型有误！'
            })
          }
        }
      } catch (error) {
        console.log(error);
      }
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
    :rules="loginRules"
    @keydown.enter="loginClick(ruleFormRef)"
  >
    <el-form-item label="用户名" prop="username">
      <el-input placeholder="请输入用户名" v-model="formData.username"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="psw">
      <el-input type="password" placeholder="请输入密码" show-password v-model="formData.psw"></el-input>
    </el-form-item>

    <el-form-item label="验证码" prop="code">
      <el-input placeholder="输入验证码" class="input-with-select" v-model="formData.code">
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
        @click="loginClick(ruleFormRef)"
      >登入</el-button>
    </el-form-item>
  </el-form>
</template>


<style scoped lang="scss">
.form {
  width: 90%;
  margin-top: 10px;
  div {
    font-size: 14px;
    // margin-bottom: 10px;
  }
  .login_btn {
    width: 100%;
    font-weight: bold;
    color: white;
  }
  span:hover {
    cursor: pointer;
  }
}
</style>