<script setup>
import { ref, reactive } from "vue";
import { getTeamPersonApi } from "@/api/team";
import { employeeTableConfig } from "@/utils/tableConfig";
import { employeeFormConfig } from "@/utils/formConfig";
import {
  addEmployeeApi,
  getEmployeeDetailApi,
  uploadEmployeeApi,
  deleteEmployApi
} from "@/api/team";
import MyTable from "@/components/MyTable.vue";
import MyForm from "@/components/MyForm.vue";
import Dialog from "@/components/Dialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const userinfo = JSON.parse(localStorage.getItem("userinfo"));
const employeeList = ref([]);
const total = ref(0);
const pageSize = ref(6);
const currentPage = ref(1);
//获取团队人员
const getTeamPersonList = async (currentPage, pageSize) => {
  const data = {
    id: userinfo.tid,
    currentPage,
    pageSize
  };
  const res = await getTeamPersonApi(data);
  const list = res.data.employeeList;
  const sum = res.data.total;
  //过滤性别和职位信息信息
  list.forEach(item => {
    if (item.sex == 0 || item.sex == 1) {
      item.sex = item.sex == 0 ? "女" : "男";
    }
    switch (item.position) {
      case 0:
        item.position = "厨师";
        break;
      case 1:
        item.position = "切菜";
        break;
      case 2:
        item.position = "打杂";
        break;
      case 3:
        item.position = "端菜";
        break;
    }
  });
  employeeList.value = list;
  total.value = sum;
};
getTeamPersonList(currentPage.value, pageSize.value);

//根据表单结构初入field属性放入formData中
const formItems = employeeFormConfig;
let formData = ref({});
//清空对象
const clearFormData = formItems => {
  let formDataInit = {};
  formItems.map(item => {
    formDataInit[item.field] = "";
  });
  formData.value = formDataInit;
};
clearFormData(formItems);

//分页变化
const currentChange = nowPage => {
  getTeamPersonList(nowPage, pageSize.value);
};

//增加员工
const addEmployee = async () => {
  //传入前加入team_id
  formData.value.team_id = userinfo.tid;
  const res = await addEmployeeApi(formData.value);
  if (res.code === 0) {
    visible.value = false;
    getTeamPersonList(currentPage.value, pageSize.value);
    ElMessage({
      type: "success",
      message: "添加成功"
    });
  } else {
    ElMessage({
      type: "error",
      message: "添加失败"
    });
  }
};
//编辑员工
const uploadEmployee = async () => {
  //传入前加入team_id
  formData.value.team_id = userinfo.tid;
  const res = await uploadEmployeeApi(formData.value);
  if (res.code === 0) {
    visible.value = false;
    //重新获取最新的人员数据
    getTeamPersonList(currentPage.value, pageSize.value);
    ElMessage({
      type: "success",
      message: "编辑成功"
    });
  } else {
    ElMessage({
      type: "error",
      message: "编辑失败"
    });
  }
};
//删除员工
const deleteEmployee = row => {
  const id = row.eid;
  ElMessageBox.confirm("是否要删除员工?", "删除", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      const res = await deleteEmployApi(id);
      if (res.code == 0) {
        //重新获取人员
        getTeamPersonList(currentPage.value, pageSize.value);
        ElMessage({
          type: "success",
          message: "删除成功"
        });
      }
    })
    .catch(() => {
      console.log('取消删除');
    });
};

const title = ref("增加员工");
const visible = ref(false);
const width = ref("40%");
//点击增加成员按钮 显示dialog
const addEmployeHandler = () => {
  //清空对象
  clearFormData(formItems);
  title.value = "增加员工";
  visible.value = true;
};
//关闭dialog
const dialogCloseHandler = () => {
  visible.value = false;
};

//查看弹窗属性
const checkVisible = ref(false);
const checkWidth = ref("27%");
const checkTitle = ref("查看员工");
//点击查看按钮
const checkClick = async row => {
  const id = row.eid;
  const res = await getEmployeeDetailApi(id);
  //过滤数据
  res.data.sex = res.data.sex == 0 ? "女" : "男";
  switch (res.data.position) {
    case 0:
      res.data.position = "厨师";
      break;
    case 1:
      res.data.position = "切菜";
      break;
    case 2:
      res.data.position = "打杂";
      break;
    case 3:
      res.data.position = "端菜";
      break;
  }
  formData.value = res.data;
  checkVisible.value = true;
};
//点击表单中的编辑按钮
const editClick = async row => {
  const eid = row.eid;
  const res = await getEmployeeDetailApi(eid);
  formData.value = res.data;
  visible.value = true;
  title.value = "编辑员工";
};
//关闭查看dialog
const checkClose = () => {
  //获取点击查看的员工的信息
  checkVisible.value = false;
};
</script>

<template>
  <div class="person_admin">
    <div class="header">
      <el-button type="warning" @click="addEmployeHandler">增加员工</el-button>
    </div>
    <!-- 自定义的table组件 包含table的数据和结构 -->
    <MyTable :tableData="employeeList" :strcture="employeeTableConfig">
      <el-table-column fixed="right" label="操作" width="250">
        <!-- 插槽插入按钮 -->
        <template #default="scope">
          <el-button type="info" @click="checkClick(scope.row)">查看</el-button>
          <el-button type="warning" @click="editClick(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteEmployee(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </MyTable>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        v-model="currentPage"
        @current-change="currentChange"
      />
    </div>
    <!-- 增加和修改的dialog -->
    <Dialog :title="title" :visivle="visible" :width="width" @dialogClose="dialogCloseHandler">
      <MyForm :formItems="formItems" v-model="formData">
        <template #footer>
          <div class="form_btn">
            <el-button type="info" @click="visible = !visible">取消</el-button>
            <el-button type="warning" v-show="title === '增加员工'" @click="addEmployee">提交</el-button>
            <el-button type="warning" v-show="title === '编辑员工'" @click="uploadEmployee">编辑</el-button>
          </div>
        </template>
      </MyForm>
    </Dialog>
    <!-- 查看的dialog -->
    <Dialog
      :title="checkTitle"
      :visivle="checkVisible"
      :width="checkWidth"
      @dialogClose="checkClose"
    >
      <div class="checkForm">
        <template v-for="(item,i) in formItems" :key="i">
          <div class="form_item">
            <span>{{item.label}}:</span>
            <span
              v-if="item.type == 'input' || item.type == 'select' || item.type == 'radio'"
            >{{formData[item.field]}}</span>
            <img
              v-else-if="item.type == 'upload' && item.field == 'employ_pic'"
              :src="formData[item.field]"
              style="width:100px;height:100px;border-radius:50px"
            />
            <img v-else-if="item.type == 'upload'" :src="formData[item.field]" :style="item.style" />
          </div>
        </template>
      </div>
    </Dialog>
  </div>
</template>


<style scoped lang="scss">
.person_admin {
  padding: 10px 30px;
  .header {
    padding: 5px 10px;
    display: flex;
    justify-content: flex-end;
  }
  .pagination {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }
  .form_item {
    display: flex;
    // align-items: center;
    margin-bottom: 20px;
    font-size: 16px;
    & span:nth-child(1) {
      margin-right: 10px;
    }
  }
}
</style>