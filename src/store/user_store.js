import { defineStore } from 'pinia';
import { reactive, ref } from 'vue'

const useUserStore = defineStore('user', () => {
    const userinfo = reactive({});
    const token = ref('');

    return {
        userinfo,token
    }
})

export default useUserStore;