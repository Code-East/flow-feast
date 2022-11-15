import { defineStore } from 'pinia';
import { reactive, ref } from 'vue'
import { get_header_list } from '@/api/index'
import { get_aside_data, getUserApi } from "@/api/index";
const useIndexStore = defineStore('index', () => {
    //头部列表
    const headerList = ref([]);
    const userdata = ref({});
    //获取头部列表
    async function getHeaderListAction() {
        try {
            const userdata = JSON.parse(localStorage.getItem('userinfo'));
            const res = await get_header_list(userdata);
            //token失效跳转到login
            if (res.code == 400) {
                return true;
            }
            if (res.code === 0) {
                //存入列表
                headerList.value = res.data;
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }
    //获取用户信息
    async function getUserData(userinfo) {
        const res = await getUserApi(userinfo);
        if (res.code === 0) {
            userdata.value = res.data;
            //获取最新的userinfo
            localStorage.setItem('userinfo',JSON.stringify(userdata.value));
        }
    }
    //获取aside所需的数据
    const feastCount = ref(0);
    const price = ref(0);
    function getAsideData() {
        get_aside_data()
            .then(res => {
                feastCount.value = res.data.feastCount;
                price.value = res.data.price;
                if (res.data.feastCount == null) {
                    feastCount.value = 0
                }
                if (res.data.price == null) {
                    price.value = 0
                }
            })
            .catch(err => console.log(err));
    }

    return {
        headerList,
        feastCount,
        price,
        userdata,
        getHeaderListAction,
        getAsideData,
        getUserData
    }
})

export default useIndexStore;