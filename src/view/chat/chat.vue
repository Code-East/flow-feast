<script setup>
import { ElMessage } from "element-plus";
import {
  getChatListApi,
  getChatUserListApi,
  getNowChatListApi
} from "@/api/chat";
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
const userinfo = JSON.parse(localStorage.getItem("userinfo")) || "";
let userID = userinfo.userType == 0 ? userinfo.uid : userinfo.tid;
//存放所有数据
const chatList = ref({});
//存放当前聊天框数据
const nowChatList = ref([]);
//当前聊天的id
const nowTalkID = ref();
const nowTalkPic = ref('');
//#region
// const getChatList = async userinfo => {
//   const res = await getChatListApi(userinfo);
//   if (res.code === 0) {
//     let list = [];
//     //将传过来的map 变为list的数组
//     for (const key in res.data) {
//       let arr = res.data[key];
//       list.push(arr);
//     }
//     chatList.value = list;
//     nowTalkID.value = list[0][0].id;
//     nowChatList.value = list[0];
//   } else {
//     ElMessage({
//       type: "error",
//       message: "出错误了"
//     });
//   }
// };
// getChatList(userinfo);
//#endregion

//获取当前正在聊天用户的聊天记录
const getNowChatList = async (sender, receiver) => {
  const res = await getNowChatListApi(sender, receiver);
  if (res.code === 0) {
    nowChatList.value = res.data;
  }
};

const chatUserList = ref([]);
//获取当前聊过天的用户列表
const getChatUserList = async userinfo => {
  const res = await getChatUserListApi(userinfo);
  if (res.code === 0) {
    chatUserList.value = res.data;
    nowTalkID.value = res.data[0].id;
    nowTalkPic.value = res.data[0].pic;
    getNowChatList(nowTalkID.value,userID);
  } else {
    ElMessage({
      type: "error",
      message: "出错误了"
    });
  }
};
getChatUserList(userinfo);

//点击切换聊天用户
const cutUser = user => {
  nowTalkID.value = user.id;
  nowTalkPic.value = user.pic
  getNowChatList(user.id,userID);
  // chatList.value.forEach(item => {
  //   if (item[0].id == id) {
  //     //切换当前聊天框数据
  //     nowChatList.value = item;
  //   } else {
  //     return false;
  //   }
  // });
};
//算出当前用户的头像
const userpic = computed(() => {
  if (userinfo.userType == 0) {
    return userinfo.userpic;
  } else {
    return userinfo.teampic;
  }
});

//聊天内容
const content = ref("");
//连接scoket服务器
const socket = io("http://localhost:3001");
//上线聊天服务器 发送当前用户id到后端
socket.emit("online", userID);

//点击发送按钮
const sendClick = () => {
  if (content.value == "") {
    //为空谈出
    return false;
  } else {
    //聊天数据对象
    const data = {};
    //如果当前用户是个人用户
    if (userinfo.userType == 0) {
      //传入的user_id 就为 当前的userID
      data.user_id = userID;
      //传入的team_id 就为 当前聊天的nowTalkID
      data.team_id = nowTalkID.value;
    } else {
      //如果当前用户是团队用户
      //传入的user_id 就为 当前聊天的nowTalkID
      data.user_id = nowTalkID.value;
      //传入的team_id 就为 当前的userID
      data.team_id = userID;
    }
    //sender和revicer一样的
    data.sender = userID;
    data.receiver = nowTalkID.value;
    data.userType = userinfo.userType;
    data.content = content.value;
    //发送信息
    socket.emit("message", data);
    //清空消息
    content.value = "";
  }
};

// const scrollbar = ref('scrollbar');
// console.log(scrollbar);
// nextTick(()=>{
//   scrollbar.scrollTo(400,400);
// })
//监听接收信息
socket.on("message", data => {
  //加入信息到当前聊天
  nowChatList.value.push(data);
});
//离开前发送离开信息到后端
onBeforeUnmount(() => {
  socket.emit("leave", userID);
});
</script>

<template>
  <div class="main_box">
    <div class="user_list">
      <ul>
        <el-scrollbar height="600px">
          <li
            v-for="(item,i) in chatUserList"
            :key="i"
            :class="{active:(item.id == nowTalkID)}"
            @click="cutUser(item)"
          >
            <img :src="item.pic" alt="用户头像" />
            <a href="#">{{item.name}}</a>
            <!-- <a href="#" v-else>{{item[0].nickname}}</a> -->
          </li>
        </el-scrollbar>
      </ul>
    </div>

    <div class="chat_box">
      <div class="message_box">
        <el-scrollbar height="400px" ref="scrollbar">
          <div class="message_item" v-for="(item,i) in nowChatList" :key="item.cid">
            <div class="message_item_left" v-if="(item.sender === nowTalkID)">
              <div class="left_message_box">
                <img :src="nowTalkPic" alt="用户头像" />
                <div class="message">{{item.content}}</div>
              </div>
            </div>
            <div class="message_item_right" v-else>
              <div class="right_message_box">
                <div class="message">{{item.content}}</div>
                <img :src="userpic" alt="用户头像" />
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="inp_box">
        <div class="text_box">
          <el-input
            v-model="content"
            :rows="5"
            type="textarea"
            placeholder="输入信息"
            resize="none"
            class="text_inp"
          />
        </div>
        <div class="btn_box">
          <el-button type="info">清空</el-button>
          <el-button type="primary" @click="sendClick">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.main_box {
  width: 100%;
  height: 600px;
  background-color: #fff;
  display: flex;
}

.user_list {
  width: 30%;
  height: 100%;
  padding: 10px;
  border-radius: 10px 0 0 10px;
  border-right: $border;
  ul {
    width: 100%;
    height: 100%;
    li {
      list-style: none;
      width: 100%;
      height: 50px;
      display: flex;
      border-bottom: $border;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        margin-top: 5px;
      }
      a {
        display: block;
        text-decoration: none;
        height: 100%;
        flex: 1;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        color: #7f8c8d;
      }
    }
  }
}

.chat_box {
  width: 70%;
  height: 100%;
  border-radius: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
  .message_box {
    width: 100%;
    height: 73%;
    border-bottom: $border;
    margin-bottom: 5px;
    .message_item {
      width: 100%;
      margin: 10px 0;
      .message_item_left {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        .left_message_box {
          display: flex;
          width: 70%;
          justify-content: flex-start;
          .message {
            background-color: #f5f6fa;
            padding: 5px 10px;
            font-size: 16px;
            border-radius: 10px;
            margin: 0 5px;
            display: flex;
            align-items: center;
          }
        }
      }
      .message_item_right {
        width: 100%;
        display: flex;
        justify-content: end;
        .right_message_box {
          display: flex;
          width: 70%;
          justify-content: end;
          .message {
            background-color: #f1c40f;
            padding: 5px 10px;
            font-size: 16px;
            border-radius: 10px;
            margin: 0 5px;
            display: flex;
            align-items: center;
          }
        }
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50px;
      }
    }
  }
}
.inp_box {
  width: 100%;
  flex: 1;
  border-top: $border;
  .btn_box {
    display: flex;
    margin: 15px;
    float: right;
  }
}
.active {
  background-color: #ecf0f1;
  a {
    color: #2980b9 !important;
  }
}
</style>