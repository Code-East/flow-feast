import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getPersonalFeastListApi,getDetailFeastApi } from '@/api/feast'
import { feastObjHandler } from "@/utils/feastObjHandler";

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
            for (let i = 0; i < res.data.length; i++) {
                switch (res.data[i].status) {
                    case 0:
                        res.data[i].cStatus = '审核中';
                        res.data[i].color = '#f39c12'
                        break;
                    case 1:
                        res.data[i].cStatus = '审核通过';
                        res.data[i].color = '#2ecc71'
                        break;
                    case 2:
                        res.data[i].cStatus = '审核未通过';
                        res.data[i].color = '#e74c3c'
                        break;
                    case 3:
                        res.data[i].cStatus = '进行中';
                        res.data[i].color = '#498db'
                        break;
                    case 4:
                        res.data[i].cStatus = '完成';
                        res.data[i].color = '#2ecc71'
                        break;
                }

            }
            //修改personalFeastList的属性
            personalFeastList.value = res.data;
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