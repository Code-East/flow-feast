<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
//当前默认选择
const activeIndex = ref("/index/feast_team_admin/base_message");
const handleSelect = (key, keyPath) => {
    router.push(key);
};
</script>

<template>
  <div class="team_admin_box">
    <div class="title_menu">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        active-text-color="#f39c12"
        style="border-radius:25px 25px 0 0"
        @select="handleSelect"
      >
        <el-menu-item index="/index/feast_team_admin/base_message">基本信息</el-menu-item>
        <el-menu-item index="/index/feast_team_admin/person_admin">团队成员</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>


<style scoped lang="scss">
.team_admin_box {
  width: 100%;
  border-radius: $box-radius;
  background-color: #fff;
  .title_menu {
    .el-menu-item:nth-child(1) {
      border-radius: 25px 0 0 0;
    }
  }
}
</style>