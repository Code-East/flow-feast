<script setup>
import FeastCard from "@/components/FeastCard.vue";
import { getFeastListApi } from "@/api/feast";
import { ref } from "vue";
import { feastFormConfig } from "@/utils/formConfig";
let feastList = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

const getFeastList = async (page, pageSize) => {
  let res = await getFeastListApi(page, pageSize);
  feastList.value = res.data.list;
  total.value = res.data.total;
};

getFeastList(currentPage.value, pageSize.value);

const changePage = nowPage => {
  getFeastList(nowPage, pageSize.value);
};

//dialog显示
const data = ref({});
const dialogVisivle = ref(false);
const titleClick = feastData => {
  dialogVisivle.value = true;
  data.value = feastData;
};
//承接
const acceptFeast = () => {
  console.log(data.value);
};
</script>

<template>
  <div class="feast_page">
    <div class="feast_list">
      <FeastCard
        v-for="(item,i) in feastList"
        :key="item.fid"
        :feastObj="item"
        @cardClick="titleClick"
      ></FeastCard>
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
    <el-dialog v-model="dialogVisivle" title="宴席详情" width="30%">
      <MyForm :formItems="feastFormConfig" v-model="data">
        <template #footer>
          <el-button type="primary" @click="acceptFeast">承接</el-button>
        </template>
      </MyForm>
    </el-dialog>
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