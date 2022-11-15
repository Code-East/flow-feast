<script setup>
import { reactive, ref, computed } from "vue";
import { upyunSignature } from "@/utils/upLoadYun";
import { regionData } from "element-china-area-data";
import { addressToCode, addressToText } from "@/utils/addressHandler";
import { setTeamDataApi } from "@/api/team";
import { ElMessage } from "element-plus";
import indexStore from '@/store/index_store'
import Upload from "@/components/Upload.vue";
const store = indexStore();
//地址数据
const options = regionData;
//文件参数 调用utils里面的参数获得
const fileData = upyunSignature("/feast/team_pic");
const businessFileData = upyunSignature("/feast/business_license");
//是否为编辑状态
const notEdit = ref(true);
//获取当前存入的用户对象
const userinfo = JSON.parse(localStorage.getItem("userinfo"));

//定义小数字范围
const minScale = ref(1);
const maxScale = ref(1);
//拼接
const teamScale = computed(() => {
  return minScale.value + "~" + maxScale.value;
});

//选择状态
const status = computed(() => {
  switch (userinfo.isonline) {
    case 0:
      return "未提交";
    case 1:
      return "待审核";
    case 2:
      return "已上线";
    case 3:
      return "审核未通过";
  }
});
//form表单数据
const form = reactive({});

//修改form数据
setFormData(userinfo);
//为form赋值
function setFormData(userinfo) {
  //拆分范围
  if (userinfo.team_scale != undefined && userinfo.team_scale != "") {
    const scale = userinfo.team_scale.split("~");
    minScale.value = scale[0];
    maxScale.value = scale[1];
  }
  if (userinfo.address != undefined && userinfo.address != "" && typeof userinfo.address === 'string') {
    userinfo.address = addressToCode(userinfo.address);
  }
  (form.tid = userinfo.tid),
    (form.teampic = userinfo.teampic),
    (form.tname = userinfo.tname),
    (form.psw = userinfo.psw),
    (form.team_scale = teamScale.value),
    (form.team_price = userinfo.team_price),
    (form.business_license = userinfo.business_license),
    (form.team_introduction = userinfo.team_introduction),
    (form.address = userinfo.address),
    (form.isonline = userinfo.isonline);
}

//团队头像上传成功
const teampicSuccess = imgurl => {
  //上传成功后会返回文件地拼接文件地址，将其拼接上又拍云的图片访问的跟地址 存入数据库即可
  form.teampic = imgurl;
};
//营业执照上传成功
const businessFileHandler = imgurl => {
  //上传成功后会返回文件地拼接文件地址，将其拼接上又拍云的图片访问的跟地址 存入数据库即可
  form.business_license = imgurl;
}

//取消按钮
const cancelHandler = () => {
  notEdit.value = true;
  console.log(userinfo);
  setFormData(userinfo);
};
//提交按钮
const submitHandler = async () => {
  if (form.address != "" && form.address != undefined) {
    //如果填写了地址 就将地址转化为text
    form.address = addressToText(form.address);
  }
  if (form.tname == "" || form.psw === "") {
    ElMessage({
      type: "warning",
      message: "用户名或密码不能为空！"
    });
  }
  
  //修改拼接后的scale
  form.team_scale = teamScale.value;
  const res = await setTeamDataApi(form);
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "提交成功"
    });
    //修改当前form数据
    setFormData(form);
    store.getUserData(form);
    notEdit.value = true;
  } else {
    ElMessage({
      type: "error",
      message: "修改失败"
    });
  }
};
</script>

<template>
  <div class="content_box">
    <el-form :model="form">
      <el-form-item label="团队头像">
        <Upload
          :disabled="!notEdit"
          :imgSrc="form.teampic"
          :fileData="fileData"
          @successHandler="teampicSuccess"
        />
      </el-form-item>

      <el-form-item label="团队名称">
        <el-input v-model="form.tname" :readonly="notEdit" style="width:60%"></el-input>
      </el-form-item>

      <el-form-item label="密 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 码">
        <el-input
          v-model="form.psw"
          :readonly="notEdit"
          type="password"
          show-password
          style="width:60%"
        ></el-input>
      </el-form-item>

      <el-form-item label="团队规模">
        <el-input-number v-model="minScale" controls-position="right" :disabled="notEdit" min="1" />
        <span class="gap">至</span>
        <el-input-number v-model="maxScale" controls-position="right" :disabled="notEdit" min="1" />
      </el-form-item>

      <el-form-item label="团队价位">
        <el-input v-model="form.team_price" :readonly="notEdit" style="width:10%"></el-input>
        <span class="price">/ 桌</span>
      </el-form-item>

      <el-form-item label="营业执照">
        <Upload
          :disabled="!notEdit"
          :imgSrc="form.business_license"
          :fileData="businessFileData"
          @successHandler="businessFileHandler"
          :loadStyle="{width:200+'px',height:100+'px',borderRadius:0+'px',display: 'flex',justifyContent: 'center'}"
        />
      </el-form-item>

      <el-form-item label="团队简介">
        <el-input
          v-model="form.team_introduction"
          :readonly="notEdit"
          type="textarea"
          placeholder="暂无内容"
          resize="none"
          rows="4"
          maxlength="200"
        ></el-input>
      </el-form-item>

      <el-form-item label="团队地址">
        <el-cascader
          :options="options"
          v-model="form.address"
          placeholder="请选择"
          style="width:100%"
          :disabled="notEdit"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  态">
        <span>{{status}}</span>
      </el-form-item>

      <el-form-item>
        <div class="btn_box">
          <el-button type="warning" v-show="notEdit" @click="notEdit = !notEdit" size="large">修改</el-button>
          <el-button type="info" v-show="!notEdit" @click="cancelHandler">取消</el-button>
          <el-button type="primary" v-show="!notEdit" @click="submitHandler">提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>


<style scoped lang="scss">
.content_box {
  padding: 30px 20px;
  .gap {
    padding: 0 10px;
  }
  .price {
    margin-left: 10px;
  }
  .btn_box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>