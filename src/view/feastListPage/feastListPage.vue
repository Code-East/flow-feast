<script setup>
import FeastCard from "@/components/FeastCard.vue";
import { getFeastListApi, teamAcceptFeastApi } from "@/api/feast";
import { ref } from "vue";
import { teamCheckFeastConfig } from "@/utils/formConfig";

let feastList = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const userinfo = JSON.parse(localStorage.getItem("userinfo"));

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
const acceptFeast = async () => {
  ElMessageBox.confirm("是否与用户进行沟通，确认承接宴席?", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    const res = await teamAcceptFeastApi(data.value, userinfo.tid);
    if (res.code === 0) {
      dialogVisivle.value = false;
      getFeastList(currentPage.value, pageSize.value);
      ElMessage({
        type: "success",
        message: "承接成功,等待用户付款"
      });
    }
  });
};
</script>

<template>
  <div class="feast_page">
    <div class="feast_list" v-if="(feastList.length > 1)">
      <FeastCard
        v-for="(item,i) in feastList"
        :key="item.fid"
        :feastObj="item"
        @cardClick="titleClick"
      ></FeastCard>
    </div>
    <div class="empty" v-else>
      <h3>暂无发布宴席</h3>
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
      <MyForm :formItems="teamCheckFeastConfig" v-model="data">
        <template #footer>
          <span class="price">￥{{(data.scale*data.price)}}</span>
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
.price {
  color: red;
  font-size: 18px;
  margin-right: 10px;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
.empty {
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 15px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>