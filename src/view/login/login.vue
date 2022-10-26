<script setup>
import login_component from "../../components/login/login_component.vue";
import register_component from "../../components/login/register_component.vue";
import { ref, computed } from "vue";
const isLogin = ref(true);
const title = computed(() => {
  return isLogin.value ? "登入" : "注册";
});
const toWhere = computed(() => {
  return isLogin.value ? "没有账号,去注册" : "已有账号,去登入";
});
const changStatus = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <!-- @keydown.enter="submitForm" -->
  <div id="entrance">
    <div class="main_box">
      <h1>{{title}}</h1>
      <component :is="isLogin ? login_component : register_component"></component>
      <a href="#" class="to_register" @click="changStatus">{{toWhere}}</a>
    </div>
  </div>
</template>
  
  
<style lang="scss" scoped>
#entrance {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .main_box {
    width: 390px;
    // height: 460px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  .to_register {
    display: block;
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