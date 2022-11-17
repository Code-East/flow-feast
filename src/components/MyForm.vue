<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <el-form ref="ruleFormRef" :labelWidth="labelWidth" :rules="rules">
    <template v-for="item in formItems" :key="item.label">
      <el-form-item v-if="!item.isHidden" :label="item.label" :style="itemStyle" :prop="item.prop">
        <template v-if="item.type === 'input' || item.type === 'password'">
          <el-input
            :placeholder="item.placeholder"
            :show-password="item.type === 'password'"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="valueChange($event, item.field)"
          ></el-input>
        </template>
        <template v-else-if="item.type === 'select'">
          <el-select
            :placeholder="item.placeholder"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="valueChange($event, item.field)"
          >
            <el-option
              v-for="option in item.options"
              :key="option.label"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </template>
        <template v-else-if="item.type === 'upload'">
          <Upload
            :imgSrc="modelValue[`${item.field}`]"
            :fileData="upyunSignature(item.savePath)"
            @successHandler="successHandler"
            :loadStyle="item.style"
          ></Upload>
        </template>
        <template v-else-if="item.type === 'radio'">
          <el-radio-group :model-value="modelValue[`${item.field}`]" 
          @update:modelValue="valueChange($event, item.field)">
            <el-radio label="0">女</el-radio>
            <el-radio label="1">男</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
    </template>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { upyunSignature } from "@/utils/upLoadYun";
import Upload from "@/components/Upload.vue";
const props = defineProps({
  formItems: {
    type: Array,
    default: []
  },
  labelWiddth: {
    type: String,
    default: "120px"
  },
  itemStyle: {
    type: Object,
    default: {
      padding: "10px 20px"
    }
  },
  modelValue: Object, //绑定表单的每个数据
  rules:Object, //表单校验
});
const emit = defineEmits(["update:modelValue"]);

// 输入框值改变该函数都会触发，将改变后的值传出去
const valueChange = (value, field) => {
  emit("update:modelValue", { ...props.modelValue, [field]: value });
};
//上传图片成功
const successHandler = imgSrc => {
  const imgsrcList = imgSrc.split("/");
  const pathName = imgsrcList[imgsrcList.length - 2];
  emit("update:modelValue", { ...props.modelValue, [pathName]: imgSrc });
};
</script>
  

<style scoped>
.el-form-item {
  margin-top: 18px;
}
.el-select {
  width: 100%;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>