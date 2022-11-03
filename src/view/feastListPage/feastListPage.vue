<script setup>
import FeastCard from "@/components/FeastCard.vue";
import { getFeastListApi,getNameListApi } from "@/api/feast";
import { ref } from "vue";
let feastTeamList = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

const getFeastList = async (page, pageSize) => {
    let res = await getFeastListApi(page, pageSize);
    feastTeamList.value = res.data.list;
    total.value = res.data.total;
    for (let i = 0; i < feastTeamList.value.length; i++) {
        let data = await getNameListApi(feastTeamList.value[i].user_id);
        feastTeamList.value[i].username = data.nickname;
    }
};

getFeastList(currentPage.value, pageSize.value);

const changePage = nowPage => {
    getFeastList(nowPage, pageSize.value);
};
</script>

<template>
  <div class="feast_page">
    <div class="feast_list">
      <FeastCard v-for="(item,i) in feastTeamList" :key="item.fid" :feastObj = item></FeastCard>
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


<style scoped>
.feast_list {
  width: 100%;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>