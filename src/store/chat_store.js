import { defineStore } from 'pinia';
import { reactive, ref } from 'vue'
import { getChatListApi } from "@/api/chat";

const useChatStore = defineStore('user', () => {
    const chatlist = ref([]);
    const getChatList = async userinfo => {
        const res = await getChatListApi(userinfo);
        if (res.code === 0) {
          let list = [];
          //将传过来的map 变为list的数组
          for (const key in res.data) {
            let arr = res.data[key];
            list.push(arr);
          }
          chatlist.value = list;
        } else {
          ElMessage({
            type: "error",
            message: "出错误了"
          });
        }
      };
    return {
        chatlist,
        getChatList
    }
})

export default useChatStore;