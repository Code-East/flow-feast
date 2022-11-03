import { defineStore } from 'pinia';
import { reactive, ref } from 'vue'
import { get_header_list } from '@/api/index'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter();
const useIndexStore = defineStore('index', () => {
    const headerList = ref([]);

    async function getHeaderListAction() {
        try {
            const res = await get_header_list();
            //token失效跳转到login
            if (res.code == 400) {
                ElMessageBox.alert("诶,你的令牌呢,赶紧重新登入！", "登入失效", {
                    confirmButtonText: "OK",
                    callback: (action) => {
                        localStorage.clear();
                        router.push("/login");
                    },
                });
                return;
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

    return {
        headerList,
        getHeaderListAction
    }
})

export default useIndexStore;