<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { getTeamMessageApi, getEmployeeDetailApi } from "@/api/team";
import {
  teamMessageFormConfid,
  checkEmployeeFormConfig,
  buyFeastFormConfig
} from "@/utils/formConfig";
import Myform from "@/components/Myform.vue";

const route = useRoute();
const id = route.query.id;
const teamData = ref({});
//过滤职业
const filterEmployee = list => {
  for (let i = 0; i < list.length; i++) {
    switch (list[i].position) {
      case 0:
        list[i].position = "厨师";
        break;
      case 1:
        list[i].position = "切菜";
        break;
      case 2:
        list[i].position = "打杂";
        break;
      case 3:
        list[i].position = "端菜";
        break;
    }
  }
  return list;
};

//下单的宴席对象
const feastData = ref({});
buyFeastFormConfig.forEach(item => {
  feastData.value[item.field] = "";
});
//获取团队信息
const getTeamMessage = async id => {
  const res = await getTeamMessageApi(id);
  res.data.employeeList = filterEmployee(res.data.employeeList);
  teamData.value = res.data;
  //将价格等信息加入表单对象
  feastData.value.price = teamData.value.baseMessage.team_price;
  feastData.value.team_id = teamData.value.baseMessage.tid;
};
getTeamMessage(id);

//点击成员展示成员信息
const employeeData = ref({});
const dialogVisivle = ref(false);
const dialogTitle = ref("成员信息");
const checkEmploy = async eid => {
  dialogTitle.value = "成员信息";
  const res = await getEmployeeDetailApi(eid);
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
  employeeData.value = res.data;
  dialogVisivle.value = true;
};

//点击下单按钮
const buyClick = () => {
  dialogTitle.value = "下单信息";
  dialogVisivle.value = true;
};

//切换表单结构
const formConfig = computed(() => {
  if (dialogTitle.value === "下单信息") {
    return buyFeastFormConfig;
  } else if (dialogTitle.value === "成员信息") {
    return checkEmployeeFormConfig;
  }
});
//切换表单数据
const formData = computed(() => {
  if (dialogTitle.value === "下单信息") {
    return feastData.value;
  } else if (dialogTitle.value === "成员信息") {
    return employeeData.value;
  }
});
//总价
const total = computed(() => {
    return feastData.value.price * feastData.value.scale;
});

const paymentHandler =()=>{
    console.log(feastData.value);
}
</script>

<template>
  <div class="team_detail_box">
    <Myform
      :formItems="teamMessageFormConfid"
      v-model="teamData.baseMessage"
      v-if="teamData.baseMessage"
    ></Myform>
    <h5>团队成员</h5>
    <el-scrollbar>
      <div class="employee_list" v-if="teamData.employeeList">
        <div
          class="employee_item"
          v-for="(item,i) in teamData.employeeList"
          :key="item.eid"
          @click="checkEmploy(item.eid)"
        >
          <el-avatar size="large" :src="item.employ_pic" />
          <div class="name_box">
            <p>{{item.name}}</p>
            <p>{{item.position}}</p>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="buy_box">
      <el-button type="warning" size="large" @click="buyClick">去下单</el-button>
    </div>

    <el-dialog v-model="dialogVisivle" :title="dialogTitle" width="35%">
      <Myform :formItems="formConfig" v-model="formData">
        <template #footer v-if="dialogTitle === '下单信息'">
          <div class="form_footer">
            <p>
              总计价格：
              <span style="color:red;font-weight:bold;">￥{{total}}</span>
            </p>
            <el-button type="primary" @click="paymentHandler">下单</el-button>
          </div>
        </template>
      </Myform>
    </el-dialog>
  </div>
</template>


<style scoped lang="scss">
.team_detail_box {
  width: 100%;
  background-color: #fff;
  border-radius: $box-radius;
  padding: $box-padding;
  h5 {
    margin-left: 14px;
    color: #606266;
  }
  .employee_list {
    width: 100%;
    display: flex;
    padding: 10px;
    .employee_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 25px;
      &:hover {
        cursor: pointer;
      }
      .name_box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      p {
        font-size: 14px;
      }
    }
  }
  .buy_box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .form_footer {
    display: flex;
    align-items: center;
    p {
      margin-right: 10px;
    }
  }
}
</style>