<script setup>
import { ref, watch, reactive } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { regionData, TextToCode, CodeToText } from "element-china-area-data";
import { setUserAttribute } from "@/api/user";
import indexStore from "@/store/index_store";
import { ElMessage } from "element-plus";
import { upyunSignature } from "@/utils/upLoadYun";
import { addressToCode, addressToText } from "@/utils/addressHandler";
import Upload from '@/components/Upload.vue'

const store = indexStore();
//地址数据
const options = regionData;

//文件参数 调用utils里面的参数获得
const fileData = upyunSignature("/feast/user_pic");
//上传成功
const handleSuccess = imgurl => {
  picEdit.value = true;
  //上传成功后会返回文件地拼接文件地址，将其拼接上又拍云的图片访问的跟地址 存入数据库即可
  userdata.userpic = imgurl;
};

//获取locatStorage中的用户信息
let userinfo = JSON.parse(localStorage.getItem("userinfo"));
//拼接地址的code
let userdata;
if (userinfo.address != null) {
  //判断是否有地址 有地址加入地址过滤
  let addressCodeList = addressToCode(userinfo.address);
  userdata = reactive({ ...userinfo, address: addressCodeList });
} else {
  //没地址直接赋值
  userdata = reactive({ ...userinfo });
}
//编辑状态
const picEdit = ref(false);
const usernameEdit = ref(false);
const pswEdit = ref(false);
const addressEdit = ref(false);
//点击编辑的处理函数
const editHandler = type => {
  switch (type) {
    case "userpic":
      picEdit.value = !picEdit.value;
      break;
    case "nickname":
      usernameEdit.value = !usernameEdit.value;
      break;
    case "psw":
      pswEdit.value = !pswEdit.value;
      break;
    case "address":
      addressEdit.value = !addressEdit.value;
      break;
  }
};

//点击取消的处理函数
const cancelHandler = type => {
  switch (type) {
    case "userpic":
      picEdit.value = !picEdit.value;
      userdata.userpic = userinfo.userpic;
      break;
    case "nickname":
      usernameEdit.value = !usernameEdit.value;
      userdata.nickname = userinfo.nickname;
      break;
    case "psw":
      pswEdit.value = !pswEdit.value;
      userdata.psw = userinfo.psw;
      break;
    case "address":
      addressEdit.value = !addressEdit.value;
      userdata.address = addressToCode(userinfo.address);
      break;
  }
};

//点击确认修改内容
const affirmHandler = async type => {
  if (type == "address") {
    let address = addressToText(userdata.address);
    if (!address) {
      ElMessage({
        type: "warring",
        message: "修改的内容不能为空！"
      });
    }
    console.log(userdata);
    const res = await setUserAttribute(type, address, userdata.uid);
    console.log(res);
    if (res.code === 0) {
      ElMessage({
        type: "success",
        message: "修改成功"
      });
    }
    //更新store中的userinfo
    store.getUserData(userdata);
    //修改编辑状态
    editHandler(type);
    return;
  }
  if (!userdata[type]) {
      ElMessage({
        type: "warring",
        message: "修改的内容不能为空！"
      });
    }
  const res = await setUserAttribute(type, userdata[type], userdata.uid);
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: res.message
    });
    //更新store中的userinfo
    store.getUserData(userdata);
    //修改编辑状态
    editHandler(type);
  } else {
    ElMessage({
      type: "error",
      message: "修改失败"
    });
  }
};
</script>

<template>
  <div class="personal">
    <div class="personal_content">
      <div class="item_box">
        <span>用户头像</span>
        <Upload 
          :disabled = 'picEdit' 
          :imgSrc = "userdata.userpic" 
          :fileData = "fileData"
          @successHandler = "handleSuccess"
        />
        <div class="edit_box" v-show="picEdit">
          <el-button type="info" @click="cancelHandler('userpic')">取消</el-button>
          <el-button type="warning" @click="affirmHandler('userpic')">确定</el-button>
        </div>
        <el-link :icon="Edit" class="icon" @click="editHandler('userpic')">编辑</el-link>
      </div>
      <div class="item_box">
        <span>用户名</span>
        <el-input
          v-model="userdata.nickname"
          class="user_inp"
          placeholder="暂无内容"
          :readonly="!usernameEdit"
        />
        <div class="edit_box" v-show="usernameEdit">
          <el-button type="info" @click="cancelHandler('nickname')">取消</el-button>
          <el-button type="warning" @click="affirmHandler('nickname')">确定</el-button>
        </div>
        <el-link :icon="Edit" class="icon" @click="editHandler('nickname')">编辑</el-link>
      </div>
      <div class="item_box">
        <span>用户ID</span>
        <p>22001</p>
      </div>
      <div class="item_box">
        <span>密 &nbsp; 码</span>
        <el-input
          v-model="userdata.psw"
          class="user_inp"
          placeholder="暂无内容"
          type="password"
          show-password
          :readonly="!pswEdit"
        />
        <div class="edit_box" v-show="pswEdit">
          <el-button type="info" @click="cancelHandler('psw')">取消</el-button>
          <el-button type="warning" @click="affirmHandler('psw')">确定</el-button>
        </div>
        <el-link :icon="Edit" class="icon" @click="editHandler('psw')">编辑</el-link>
      </div>
      <div class="address_box">
        <span>地 &nbsp; 址</span>
        <el-cascader
          :options="options"
          v-model="userdata.address"
          placeholder="请选择"
          :disabled="!addressEdit"
          style="width:55%"
        ></el-cascader>
        <div class="edit_box" v-show="addressEdit">
          <el-button type="info" @click="cancelHandler('address')">取消</el-button>
          <el-button type="warning" @click="affirmHandler('address')">确定</el-button>
        </div>
        <el-link :icon="Edit" class="icon" @click="editHandler('address')">编辑</el-link>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.personal {
  width: 100%;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: $box_radius;
  box-shadow: $card-box-shadow;
  .item_box {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    span {
      margin-right: 50px;
    }
    .icon {
      margin-left: 30px;
      color: $btn-bg;
      display: none;
      transition: all 1s ease;
    }
    &:hover .icon {
      display: block;
    }
  }
  // .avatar-uploader {
  //   width: 100px;
  //   height: 100px;
  //   display: block;
  //   border: 2px dashed #8c939d;
  //   border-radius: 50%;
  //   transition: 0.5s;
  //   position: relative;
  //   .avatar_img {
  //     width: 100px;
  //     height: 100px;
  //     border-radius: 50px;
  //     position: absolute;
  //     top: -2px;
  //     left: -2px;
  //   }
  // }
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 100px;
  //   height: 100px;
  //   text-align: center;
  // }
  ::v-deep .el-upload-list {
    // 上传进度条位置
    position: relative;
    top: 60px;
    left: 115%;
  }
  .user_inp {
    width: 30%;
  }
  .address_box {
    display: flex;
    align-items: center;
    span {
      margin-right: 50px;
    }
    .province {
      width: 80%;
    }
    .icon {
      color: $btn-bg;
      display: none;
      margin-left: 20px;
    }
    &:hover .icon {
      display: block;
    }
  }
  .edit_box {
    // margin-left: 30px;
    padding: 0 15px;
  }
}
</style>