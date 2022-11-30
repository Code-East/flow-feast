<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <el-form ref="ruleFormRef">
    <template v-for="item in formItems" :key="item.label">
      <el-form-item :label="item.label">
        <template v-if="item.type === 'input' || item.type === 'password'">
          <el-input
            :placeholder="item.placeholder"
            :show-password="item.type === 'password'"
            v-model="modelValue[`${item.field}`]"
            @update:modelValue="valueChange($event, item.field)"
            :readonly="item.disable"
          ></el-input>
        </template>
        <template v-else-if="item.type === 'select'">
          <el-select
            :placeholder="item.placeholder"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="valueChange($event, item.field)"
            :disabled="item.disable"
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
            :disabled="!item.disable"
          ></Upload>
        </template>
        <template v-else-if="item.type === 'radio'">
          <el-radio-group
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="valueChange($event, item.field)"
          >
            <el-radio label="0">女</el-radio>
            <el-radio label="1">男</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="item.type === 'image'">
          <el-image
            :style="item.style"
            :src="modelValue[`${item.field}`]"
            :preview-src-list="[modelValue[`${item.field}`]]"
            :initial-index="0"
            fit="fill"
          />
        </template>
        <template v-else-if="item.type === 'date'">
          <el-date-picker
            v-model="modelValue[`${item.field}`]"
            type="date"
            @update:modelValue="valueChange($event, item.field)"
            placeholder="选择举办日期"
          />
        </template>
        <template v-else-if="item.type === 'number'">
          <el-input-number
            v-model="modelValue[`${item.field}`]"
            :min="1"
            controls-position="right"
            @update:modelValue="valueChange($event, item.field)"
          />
        </template>
        <template v-else-if="item.type === 'address'">
          <el-cascader
            :options="regionData"
            v-model="modelValue[`${item.field}`]"
            placeholder="请选择地址"
            style="width:100%"
            @update:modelValue="valueChange($event, item.field)"
          ></el-cascader>
        </template>
        <template v-else-if="item.type === 'textarea'">
          <el-input
            type="textarea"
            :placeholder="item.placeholder"
            v-model="modelValue[`${item.field}`]"
            @update:modelValue="valueChange($event, item.field)"
            :style="item.style"
          ></el-input>
        </template>
        <template v-else>
          <div>
            <span>{{modelValue[`${item.field}`]}}</span>
          </div>
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
import { regionData } from "element-china-area-data";
const props = defineProps({
  formItems: {
    type: Array,
    default: []
  },
  modelValue: Object, //绑定表单的每个数据
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
.el-dialog__body{
  padding: 0;
}
</style>