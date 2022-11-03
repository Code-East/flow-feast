<script setup>
import { ref, watch, onUnmounted, onMounted } from "vue";
import { useRouter } from "vue-router";
import useIndexStore from "@/store/index_store";
const store = useIndexStore();
//调用store中的方法 获取导航列表到store中的headerList中
store.getHeaderListAction();

const router = useRouter();

const ishind = ref(true);
const iszore = ref(false);
const scrollTop = ref(0);

const callback = () => {
  scrollTop.value = window.scrollY;
};
//绑定滚动事件
window.addEventListener("scroll", callback);
//监听滚动的位置 修改header的样式
watch(
  scrollTop,
  (newval, oldval) => {
    if (newval != 0) {
      iszore.value = true;
    } else {
      iszore.value = false;
    }
    if (newval > oldval) {
      ishind.value = true;
    } else {
      ishind.value = false;
    }
  },
  { immediate: true }
);
//点击跳转
const userinfo = JSON.parse(localStorage.getItem('userinfo'));
const itemClick = item => {
  window.scrollTo(0, 0);
  //判断是否去首页
  if(item === 'index'){
    //根据用户类型跳转指定首页
    if (userinfo.userType === '0') {
      //个人用户
      router.push('/index/feast_team_page');
    }else{
       //团队用户
       router.push('/index/feast_list_page');
    }
  }else if (item.path == "/search") {//判断是否是search
    dialogVisible.value = true;
  } else {
    router.push(item.path);
  }
};
//当组件挂载是让滚动条在顶部
onMounted(() => {
  window.scrollTo(0, 0);
});
//当组件卸载是让滚动条在顶部 解绑事件
onUnmounted(() => {
  window.scrollTo(0, 0);
  window.removeEventListener("scroll", callback);
});
</script>

<template>
  <header class="by_header">
    <!--  -->
    <div class="header_nav" :class="{ hind: ishind, notzore: iszore }">
      <a href="javascript:;" @click="itemClick('index')">Flow-Feast</a>
      <div class="header_menu">
        <ul>
          <li v-for="(item, i) in store.headerList" :key="item.path">
            <a href="javascript:;" @click="itemClick(item)">
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.by_header {
  position: relative;
  height: 60px;
  .header_nav {
    background: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    z-index: 90;
    display: flex;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    font-size: 18px;
    animation: header_animation 1s;
    transition: 0.5s;
    justify-content: space-between;
    & > a {
      color: $font-color-black;
      text-decoration: none;
      font-weight: bold;
      font-size: 16px;
    }
    .header_menu > ul {
      display: flex;
      list-style: none;
      translate: 1s;
      & li {
        position: relative;
        display: inline-block;
        padding: 0 0 0 20px;
        text-align: center;
        a {
          display: flex;
          align-items: center;
          color: $font-color-black;
          text-decoration: none;
          font-size: 16px;
          cursor: pointer;
          overflow: hidden;
          &::after {
            content: "";
            position: absolute;
            bottom: -4px;
            left: -30px;
            width: 70%;
            height: 3px;
            background-color: $main_color;
            border-radius: 4px;
            opacity: 0;
            transition: all 0.5s ease;
          }
          &:hover::after {
            left: 34%;
            opacity: 1;
          }

          i {
            font-weight: bold;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.hind {
  transform: translateY(-100%);
}
.notzore {
  background: rgb(0 0 0 / 30%);
}

// @media screen and (max-width: 750px) {
//   .header_menu {
//     display: none;
//   }
//   .phone_menu {
//     display: block;
//   }
// }
// @media screen and (min-width: 750px) {
//   .header_menu {
//     display: block;
//   }
//   .phone_menu {
//     display: none;
//   }
// }
</style>
