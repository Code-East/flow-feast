<script setup>
import { ref } from "vue";
import FesatDialog from "@/components/FeastDialog.vue";
import useFeastStore from "@/store/feast_store";
import { deleteFeastApi } from "@/api/feast";
import { ElMessage } from "element-plus";

//使用store
const store = useFeastStore();
//调用获取个人所发布的宴席列表
if (!store.personalFeastList.value) {
  store.getPersonalFeastList();
}
const dialogVisible = ref(false);
const nowTitle = ref("发布宴席");
//点击发布宴席按钮
const publicHandler = () => {
  nowTitle.value = "发布宴席";
  dialogVisible.value = true;
};

//点击提交或者修改的处理函数
const submitDialog = () => {
  store.getPersonalFeastList();
  dialogVisible.value = false;
};

//修改dialog的显示
const hindDialog = () => {
  dialogVisible.value = false;
};

const dialogFeastData = ref({});
//查看的处理函数
const checkHandler = async fid => {
  store.getNowFeast(fid);
  nowTitle.value = "查看宴席";
  dialogVisible.value = true;
};
//点击删除处理函数
const deleteHandler = async fid => {
  const res = await deleteFeastApi(fid);
  if (res.code === 0) {
    store.getPersonalFeastList();
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  }
};
//点击修改的处理函数
const updataHandler = async (fid) => {
  store.getNowFeast(fid);
  nowTitle.value = "修改宴席";
  dialogVisible.value = true;
};
</script>

<template>
  <div class="public_feast_page">
    <div class="title_box">
      <div class="title">宴席管理</div>
      <el-button type="warning" @click="publicHandler">发布宴席</el-button>
    </div>
    <div class="feast_list" v-if="store.personalFeastList.length > 0">
      <el-timeline>
        <el-timeline-item
          v-for="item in store.personalFeastList"
          :key="item.fid"
          :timestamp="item.create_time"
          :color="item.color"
          placement="top"
        >
          <el-card>
            <div class="card">
              <div class="content">
                <h4>举办时间为{{item.date_time}} &nbsp;&nbsp; 地点：{{item.address}}</h4>
                <p>{{item.description}}</p>
                <span :style="{fontSize:12+'px',color:item.color}">{{item.cStatus}}</span>
              </div>
              <div class="operation">
                <a href="#" @click="checkHandler(item.fid)">查看</a>
                <a href="#" @click="updataHandler(item.fid)">修改</a>
                <a href="#" @click="deleteHandler(item.fid)">删除</a>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="empty" v-else>
      <h3>暂无数据</h3>
    </div>
    <FesatDialog
      :dialogVisible="dialogVisible"
      :title="nowTitle"
      :feastData="dialogFeastData"
      @submitDialog="submitDialog"
      @hindDialog="hindDialog"
    ></FesatDialog>
  </div>
</template>

<style scoped lang="scss">
.public_feast_page {
  width: 100%;
  .title_box {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }
  .feast_list {
    background-color: #fff;
    margin-top: 20px;
    border-radius: 15px;
    padding: 20px;
    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .content {
        width: 85%;
      }
      .operation {
        flex: 1;
        a {
          margin: 0 5px;
          text-decoration: none;
          &:hover {
            color: $main-color;
          }
        }
      }
    }
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
}
</style>