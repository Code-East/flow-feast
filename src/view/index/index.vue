<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Aside from "@/components/Aside.vue";
</script>

<template>
  <Header></Header>
  <main>
    <div class="by_container">
      <router-view></router-view>
    </div>
    <div class="by_aside">
      <Aside></Aside>
    </div>
  </main>
  <Footer></Footer>
  <el-backtop :bottom="100">
    <div class="up"><el-icon><ArrowUpBold /></el-icon></div>
  </el-backtop>
</template>


<style scoped lang="scss">
@keyframes main_article_animate {
  from {
    transform: translateY(20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

main {
  display: flex;
  margin: 0 auto;
  padding: 32px 20px;
  max-width: 1200px;
  // height: 800px;
  // min-height: 400px;
  position: relative;
  z-index: 88;
  animation: main_article_animate 1s;
  .by_container {
    width: 75%;
    // background-color: #fff;
  }
  .by_aside {
    width: 25%;
    padding-left: 15px;
    // background-color: #fff;
  }
}
.up {
  height: 100%;
  width: 100%;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  line-height: 50px;
  color: $main_color;
  border-radius: 50px;
}
</style>