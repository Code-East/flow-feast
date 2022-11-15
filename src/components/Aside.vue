<template>
  <div class="aside">
    <div class="user">
      <div class="center">
        <div class="user_pic">
          <img :src="userPic" alt="用户头像" />
        </div>
        <div class="username">{{username}}</div>
      </div>
      <div class="user_data">
        <div class="user_data_item">
          <span>{{feastTitle}}</span>
          <span>{{store.feastCount}}</span>
        </div>
        <div class="user_data_item">
          <span>{{priceTitle}}</span>
          <span>{{store.price}}</span>
        </div>
      </div>
      <div class="github">
        <a href="#" @click="loginOut">退出登入</a>
      </div>
    </div>
    <div class="welcome">欢迎您使用Flow-Feast系统 😉~</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import indexStore from "@/store/index_store";
const store = indexStore();
const router = useRouter();
const user = JSON.parse(localStorage.getItem("userinfo"));
const userinfo = ref(user);

//监听用户信息的变化
watch(
  () => store.userdata,
  newval => {
    userinfo.value = newval;
  },
  { deep: true }
);
//判断是否有用户
if (!userinfo.value) {
  ElMessage({
    type: "error",
    message: "获取用户信息失败！"
  });
}
const username = computed(() => {
  return userinfo.value.userType == 0
    ? userinfo.value.nickname
    : userinfo.value.tname;
});
const userPic = computed(() => {
  return userinfo.value.userType == 0
    ? userinfo.value.userpic
    : userinfo.value.teampic;
});
const feastTitle = userinfo.value.userType === "0" ? "发布宴席" : "承接宴席";
const priceTitle = userinfo.value.userType === "0" ? "消费金额" : "总计金额";
//退出登入
const loginOut = () => {
  //清空本地储存
  localStorage.clear();
  //跳转
  router.replace("/login");
};

//获取aside数据
store.getAsideData();
</script>


<style scoped lang="scss">
.aside {
  .user {
    width: 277px;
    padding: 16px 20px;
    border-radius: $box-radius;
    background: #fff;
    box-shadow: $card-box-shadow;

    .center {
      width: 240px;
      height: 177px;
      text-align: center;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 110px;
        height: 110px;
        border-radius: 70px;
      }
      .username {
        font-size: 20px;
        margin-top: 10px;
      }
    }
    .user_data {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .user_data_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .github {
      margin-top: 15px;
      a {
        display: block;
        position: relative;
        width: 100%;
        height: 35px;
        font-size: 16px;
        color: #fff;
        text-decoration: none;
        background-color: $btn-bg;
        border-radius: 50px;
        text-align: center;
        line-height: 35px;
        font-weight: bold;
        overflow: hidden;
      }
      a::after {
        content: "点击退出登入";
        position: absolute;
        left: -100%;
        width: 100%;
        height: 100%;
        background-color: $main_color;
        border-radius: 50px;
        transition: 0.5s ease-out;
      }
      a:hover::after {
        left: 0;
      }
    }
  }
  .welcome {
    width: 100%;
    height: 100px;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    line-height: 100px;
    border-radius: $box-radius;
    box-shadow: $card-box-shadow;
  }
}
</style>