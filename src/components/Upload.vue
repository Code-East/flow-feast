<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  disabled: Boolean,
  imgSrc: String,
  fileData: Object,
  loadStyle: {
    type: Object,
    default: {}
  }
});
const emit = defineEmits(["successHandler"]);

// const disabled = ref(props.disabled);
// const imgSrc = ref(props.imgSrc);
//上传成功
const handleSuccess = res => {
  //上传成功后会返回文件地拼接文件地址，将其拼接上又拍云的图片访问的跟地址 存入数据库即可
  const imgSrc = "http://www.lixiandong.top" + res.url;
  emit("successHandler", imgSrc);
};
//上传失败
const handleFormatError = file => {
  ElMessage({
    type: "error",
    message: "上传失败！"
  });
};
</script>

<template>
  <el-upload
    ref="uploadRef"
    class="avatar-uploader"
    accept="image/png, image/jpeg, image/jpg"
    action="http://v0.api.upyun.com/image-feast.b0.aicdn.com"
    :disabled="!disabled"
    :data="fileData"
    :on-success="handleSuccess"
    :on-error="handleFormatError"
    :show-file-list="false"
    :style="loadStyle"
  >
    <img v-if="imgSrc" :src="imgSrc" class="avatar_img" :style="loadStyle"/>
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>


<style scoped lang="scss">
.avatar-uploader {
  width: 100px;
  height: 100px;
  display: block;
  border: 2px dashed #8c939d;
  border-radius: 50%;
  transition: 0.5s;
  position: relative;
  .avatar_img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    position: absolute;
    top: -2px;
    left: -2px;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>