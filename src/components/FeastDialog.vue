<script setup>
import { defineProps, reactive, computed, ref, defineEmits, watch } from "vue";
import { regionData, CodeToText } from "element-china-area-data";
import { ElMessage } from "element-plus";
import { publicFeastApi, updateFeastApi } from "@/api/feast";
import feastStore from "@/store/feast_store";
import useIndexStore from "@/store/index_store";
const store = feastStore();
const indexStore = useIndexStore();
let msg;
//地址数据
const options = regionData;
//外部传入的props
const props = defineProps({
  dialogVisible: Boolean,
  title: String,
  feastData: Object
});
const emit = defineEmits(["submitDialog", "hindDialog"]);
//最小宴席数
const minScale = ref(1);
//最大宴席数
const maxScale = ref(1);
//拼接宴席规模
const scale = computed(() => {
  return minScale.value + "~" + maxScale.value;
});
//省市区 地址
const province = ref("");
//详细街道
const street = ref("");
//表单数据
const form = reactive({
  scale: "",
  price: "",
  date_time: "",
  address: "",
  description: "",
  user_id: ""
});

//清空表单
const clearForm = () => {
  for (const item in form) {
    form[item] = "";
  }
  minScale.value = "";
  maxScale.value = "";
  province.value = "";
  street.value = "";
};

//是否禁用form
const disable = ref(false);
//修改按钮是否显示
const isUpdata = ref(false);

//监听feastData的变化
watch(
  () => store.nowFeast,
  newval => {
    //判断当前为什么操作
    if ((props.title = "查看宴席" && newval != undefined)) {
      minScale.value = newval.minScale;
      maxScale.value = newval.maxScale;
      province.value = newval.province;
      street.value = newval.street;
      form.price = newval.price;
      form.date_time = newval.date_time;
      form.description = newval.description;
      form.user_id = newval.user_id;
    }
  },
  {
    immediate: true
  }
);
//监听title
watch(
  () => props.title,
  newval => {
    if (newval === "查看宴席") {
      disable.value = true;
    } else if (newval === "发布宴席") {
      disable.value = false;
      isUpdata.value = false;
      //清空对象
      clearForm();
    } else {
      disable.value = false;
      isUpdata.value = true;
    }
  }
);
//dialog关闭方法
const dialogClose = () => {
  clearForm();
  //触发父函数hindDialog
  emit("hindDialog");
};
//验证表单和处理对象数据
const ruleForm = () => {
  //循坏拼接省市地址
  for (let i = 0; i < province.value.length; i++) {
    //拼接地址 CodeToText 里面包含了所有地址的code对应的中文
    form.address = form.address + CodeToText[province.value[i]] + "/";
  }
  form.address += street.value;
  //加入范围
  form.scale = scale.value;
  //加入user_id属性
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  form.user_id = userinfo.uid;

  //手动校验表单
  for (const key in form) {
    if (key == "price" && typeof form[key] != "number") {
      if (msg) msg.close();
      msg = ElMessage({
        type: "warning",
        message: "价格类型填写错误"
      });
      return;
    }
    if (!form[key]) {
      if (msg) msg.close();
      msg = ElMessage({
        type: "warning",
        message: "请将信息填写完整"
      });
      return;
    }
  }
};
//提交处理函数
const submitHandler = async () => {
  //验证表单
  ruleForm();
  // 发送请求
  const res = await publicFeastApi(form);
  //判断是否提交成功
  if (res.code == 0) {
    if (msg) msg.close();
    msg = ElMessage({
      type: "success",
      message: "提交成功"
    });
    //重新获取aside发布的宴席数
    indexStore.getAsideData();
    //清空对象
    clearForm();
    //触发隐藏dialog框
    emit("submitDialog");
  } else {
    if (msg) msg.close();
    msg = ElMessage({
      type: "error",
      message: "提交失败"
    });
  }
};

//修改处理函数
const updataHandler = async () => {
  //验证表单等
  ruleForm();
  //在store中获取当前feast对象 需要里面的fid
  const nowFeast = store.nowFeast;
  const res = await updateFeastApi(form, nowFeast.fid);
  //判断是否成功
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "修改成功"
    });
    //清空对象
    clearForm();
  }else{
    ElMessage({
      type: "error",
      message: "修改失败"
    });
  }
  //关闭dialog
  emit("submitDialog");
};
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="dialogClose" width="35%">
    <el-form :model="form" ref="ruleFormRef">
      <el-form-item label="宴席规模">
        <el-input-number v-model="minScale" controls-position="right" :readonly="disable" min="1" />
        <span class="gap">至</span>
        <el-input-number v-model="maxScale" controls-position="right" :readonly="disable" min="1" />
      </el-form-item>

      <el-form-item label="宴席价位">
        <el-input
          v-model.number="form.price"
          placeholder="价位"
          style="width:20%"
          :readonly="disable"
        />
        <span style="margin-left:10px">/桌</span>
      </el-form-item>

      <el-form-item label="举办日期">
        <el-date-picker
          v-model="form.date_time"
          type="date"
          placeholder="选择日期"
          :readonly="disable"
        />
      </el-form-item>

      <el-form-item label="宴席地址">
        <el-cascader
          :options="options"
          v-model="province"
          placeholder="请选择"
          style="width:100%"
          :disabled="disable"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="详细街道">
        <el-input v-model="street" placeholder="详细街道" style="width:100%" :readonly="disable" />
      </el-form-item>

      <el-form-item label="宴席描述">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="输入宴席描述"
          resize="none"
          rows="4"
          :readonly="disable"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="submitHandler" v-show="!disable && !isUpdata">提交</el-button>
        <el-button type="primary" @click="updataHandler" v-show="isUpdata && !disable">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped>
.gap {
  margin: 0 10px;
}
</style>