<script setup>
const props = defineProps({
  visivle: Boolean,
  title: String,
  width: String
});
const emit = defineEmits(['dialogClose'])
const closeHandler = () => {
    emit('dialogClose');
};
</script>

<template>
  <el-dialog v-model="visivle" :title="title" :width="width" @close="closeHandler">
    <slot></slot>
  </el-dialog>
</template>


<style scoped>
</style>