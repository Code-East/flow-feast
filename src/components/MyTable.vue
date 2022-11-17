<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <template v-for="(item,i) in strcture" :key="item.prop">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" />
    </template>
    <slot></slot>
  </el-table>
</template>
  
<script setup>
const props = defineProps({
    tableData:{
        type:Array,
        default:[]
    },
    strcture:Array
})
</script>



  