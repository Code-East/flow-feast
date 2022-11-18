import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getPersonalFeastListApi,getDetailFeastApi } from '@/api/feast'
import { feastObjHandler,statusHandler } from "@/utils/feastObjHandler";

const useFeastStore = defineStore('feast', () => {
    //个人用户发布过的宴席
    const personalFeastList = ref([]);
    //当前对象
    const nowFeast = ref({});
    //获取个人用户发布过宴席的方法
    const getPersonalFeastList = async () => {
        try {
            const res = await getPersonalFeastListApi();
            // 为数据加上status和color
            //修改personalFeastList的属性
            personalFeastList.value = statusHandler(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    //获取当前的宴席对象
    const getNowFeast = async (fid) => {
        const res = await getDetailFeastApi(fid);
        nowFeast.value = feastObjHandler(res.data);
    }
    return {
        personalFeastList,
        nowFeast,
        getPersonalFeastList,
        getNowFeast
    }
})

export default useFeastStore;