<script setup>
import { onMounted } from 'vue'
import useIndexStore from '@/store/index_store';
const store = useIndexStore();
//调用store中的方法 获取导航列表到store中的headerList中
store.getHeaderListAction();

</script>

<template>
    <h1>inedx</h1>
</template>


<style scoped>
</style>