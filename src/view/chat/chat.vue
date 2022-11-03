<script setup>
const list = [
  {
    class: "message_item_left",
    content: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_right",
    content: "哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_left",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_right",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_left",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_left",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_left",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_right",
    content:
      "哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_right",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_right",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_left",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
  {
    class: "message_item_right",
    content:
      "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  },
];
list.forEach(item => {
  const n = item.content.length;
  let h;
  if (n <= 14) {
    h = 36
  }else{
    h = Math.ceil(n / 14) * 24;
  }
  item.h = h;
});
</script>

<template>
  <div class="main_box">
    <div class="user_list">
      <ul>
        <el-scrollbar height="600px">
          <li>
            <img
              src="https://img1.baidu.com/it/u=3178057158,4110048229&fm=253&fmt=auto&app=138&f=JPEG"
              alt="用户头像"
            />
            <a href="#">user1</a>
          </li>
        </el-scrollbar>
      </ul>
    </div>

    <div class="chat_box">
      <div class="message_box">
        <el-scrollbar height="400px">
          <template v-for="item in list">
            <div class="message_item" :style="{height:item.h + 'px'}">
              <!-- class="message_item_left" -->
              <div :class="item.class">
                <img
                  src="https://img1.baidu.com/it/u=3178057158,4110048229&fm=253&fmt=auto&app=138&f=JPEG"
                  alt="用户头像"
                />
                <!-- <div class="message">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div> -->
                <div class="message">{{item.content}}</div>
              </div>
            </div>
          </template>
        </el-scrollbar>
      </div>
      <div class="inp_box">
        <div class="text_box">
          <el-input
            v-model="textarea"
            :rows="5"
            type="textarea"
            placeholder="输入信息"
            resize="none"
            class="text_inp"
          />
        </div>
        <div class="btn_box">
          <el-button type="info">清空</el-button>
          <el-button type="primary">发送</el-button>
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
      // height: 75px;
      margin-bottom: 10px;
      position: relative;
      .message_item_left {
        width: 50%;
        display: flex;
        position: absolute;
        left: 0px;
        align-items: center;
        word-break: break-all;
        word-wrap: break-word;
        .message {
          // height: 30px;
          background-color: #f5f6fa;
          padding: 5px 10px;
          font-size: 16px;
          border-radius: 10px;
          margin: 0 5px;
          position: absolute;
          top: 3px;
          left: 40px;
        }
      }
      .message_item_right {
        width: 50%;
        display: flex;
        flex-direction: row-reverse;
        position: absolute;
        right: 0px;
        align-items: center;
        word-break: break-all;
        /* 在长单词或 URL 地址内部进行换行。 在一行末尾处遇到长单词会自动换行去下一行展示 */
        word-wrap: break-word;
        .message {
          // height: 30px;
          background-color: #f1c40f;
          padding: 5px 10px;
          font-size: 16px;
          border-radius: 10px;
          margin: 0 5px;
          position: absolute;
          top: 3px;
          right: 40px;
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
</style>