<script setup>
import { ref } from "vue";
import { getTeamFeastApi } from "@/api/feast";
import { statusHandler } from "@/utils/feastObjHandler";
import Dialog from "@/components/Dialog.vue";
import MyForm from "@/components/MyForm.vue";
import { feastFormConfig, completeFeastFormConfig } from "@/utils/formConfig";
import { getDetailFeastApi, completeFeastApi } from "@/api/feast";
import { ElMessage } from "element-plus";
import { computed } from "@vue/reactivity";

const feastList = ref([]);
const userinfo = JSON.parse(localStorage.getItem("userinfo"));
const getTeamFeast = async tid => {
  const res = await getTeamFeastApi(tid);
  feastList.value = statusHandler(res.data);
};
getTeamFeast(userinfo.tid);

//表单数据
let formData = ref({});
// const formItems = ref(feastFormConfig);
const dialogVisible = ref(false);
const dialogTitle = ref("查看宴席");
const dialogWidth = ref("35%");
//查看宴席
const checkHandler = async fid => {
  const res = await getDetailFeastApi(fid);
  if (res.data) {
    switch (res.data.status) {
      case 0:
        res.data.status = "审核中";
        break;
      case 1:
        res.data.status = "审核通过";
        break;
      case 2:
        res.data.status = "审核未通过";
        break;
      case 3:
        res.data.status = "进行中";
        break;
      case 4:
        res.data.status = "已完成";
        break;
    }
  }
  // formItems.value = feastFormConfig;
  formData.value = res.data;
  dialogTitle.value = "查看宴席";
  dialogVisible.value = true;
};
//完成宴席
const completeHandler = async fid => {
  const res = await getDetailFeastApi(fid);
  if (res.data) {
    switch (res.data.status) {
      case 0:
        res.data.status = "审核中";
        break;
      case 1:
        res.data.status = "审核通过";
        break;
      case 2:
        res.data.status = "审核未通过";
        break;
      case 3:
        res.data.status = "进行中";
        break;
      case 4:
        tatus = "已完成";
        break;
    }
  }
  formData.value = res.data;
  // formItems.value = completeFeastFormConfig;
  dialogTitle.value = "确认完成订单";
  dialogVisible.value = true;
};
const dialogClose = () => {
  dialogVisible.value = false;
};

//点击确认完成
const affirmClick = async () => {
  if (formData.value.environment) {
    const res = await completeFeastApi(
      formData.value.fid,
      formData.value.environment
    );
    console.log(res);
    if (res.code === 0) {
      getTeamFeast(userinfo.tid);
      dialogVisible.value = false;
      ElMessage({
        type: "success",
        message: "宴席已完成"
      });
    }
  } else {
    ElMessage({
      type: "warning",
      message: "请上传完成宴席后的环境图片！！！"
    });
  }
};

//表单结构
const formConfig = computed(() => {
  if (dialogTitle.value === "查看宴席" && formData.value.status != '已完成') {
    console.log(formData.value);
    return feastFormConfig;
  } else {
    return completeFeastFormConfig;
  }
});
</script>

<template>
  <div class="feast_page">
    <div class="feast_list" v-if="feastList.length > 0">
      <el-timeline>
        <el-timeline-item
          v-for="item in feastList"
          :key="item.fid"
          :timestamp="item.create_time"
          :color="item.color"
          placement="top"
        >
          <el-card>
            <div class="card">
              <div class="content">
                <p
                  :style="{fontSize:12+'px',color:item.color,marginBottom:10+'px',fontWeight:'bold'}"
                >{{item.cStatus}}</p>
                <h4>
                  <span style="font-size:16px;margin-right:5px;font-weight:bold">{{item.nickname}}</span>
                  的宴席 举办时间为:{{item.date_time}} 地点为:{{item.address}}
                </h4>
              </div>
              <div class="operation">
                <a href="#" @click="checkHandler(item.fid)">查看</a>
                <a href="#" v-if="item.status !== 4" @click="completeHandler(item.fid)">确认完成</a>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="empty" v-else>
      <h3>暂无数据</h3>
    </div>
    <Dialog
      :visivle="dialogVisible"
      :title="dialogTitle"
      :width="dialogWidth"
      @dialogClose="dialogClose"
    >
      <MyForm :formItems="formConfig" v-model="formData">
        <template #footer>
          <div class="btn_box">
            <el-button type="warning" v-show="dialogTitle === '确认完成订单'" @click="affirmClick">确定</el-button>
          </div>
        </template>
      </MyForm>
    </Dialog>
  </div>
</template>


<style scoped lang="scss">
.feast_page {
}
.empty {
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: $box-radius;
  display: flex;
  justify-content: center;
  align-items: center;
}
.feast_list {
  background-color: #fff;
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
</style>