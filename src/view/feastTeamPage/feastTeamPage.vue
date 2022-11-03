<script setup>
import TeamItem from "@/components/TeamItem.vue";
import { get_Team_List } from "@/api/team";
import { ref } from "vue";
let feastTeamList = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

const getTeamList = (page, pageSize) => {
  get_Team_List(page, pageSize)
    .then(res => {
      feastTeamList.value = res.data.list;
      total.value = res.data.total;
    })
    .catch(err => console.log(err));
};

getTeamList(currentPage.value, pageSize.value);

const changePage = nowPage => {
  getTeamList(nowPage, pageSize.value);
};
</script>

<template>
  <div class="team_page">
    <div class="team_list">
      <TeamItem v-for="(item,i) in feastTeamList" :key="item.tid" :teamObj="item"></TeamItem>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        v-model="currentPage"
        @current-change="changePage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.team_list {
  width: 100%;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>