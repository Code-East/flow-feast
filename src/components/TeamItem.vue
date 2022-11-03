<script setup>
import { defineProps } from "vue";
const props = defineProps({
  teamObj:Object
});
const teamData = props.teamObj;
</script>

<template>
  <div class="article_card">
    <div class="img_box">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgres.crsky.com%2Fcrsky%2F59%2F290500-202104011758066065992e35fea.jpg&refer=http%3A%2F%2Fimgres.crsky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669623423&t=c7dd135109aceb1e7d30feabbcc904e9"
        alt="文章图片"
      />
      <!-- v-lazyload="v.image" -->
    </div>
    <div class="card_content">
      <a href="javascript:;">
        {{teamData.tname}}
      </a>
      <div class="content_tag">
        <div class="content_time">
          <div>
            <el-icon color="rgb(131, 164, 255)" class="content_icon">
              <Calendar />
            </el-icon>
            <span class="text">注册于{{teamData.create_time}}</span>
            <span class="gap">|</span>
          </div>
          <div>
            <el-icon color="rgb(131, 164, 255)" class="content_icon">
              <Timer />
            </el-icon>
            <span class="text">团队规模{{teamData.team_scale}}</span>
            <span class="gap">|</span>
          </div>
          <div>
            <el-icon color="rgb(131, 164, 255)" class="content_icon">
              <PriceTag />
            </el-icon>
            <span class="text">{{teamData.team_price}}/桌</span>
          </div>
        </div>
      </div>
      <div class="content_text">{{teamData.team_introduction}}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article_card {
  display: flex;
  align-items: center;
  height: 250px;
  border-radius: 25px;
  background: $card-bg;
  box-shadow: $card-box-shadow;
  transition: all 0.3s;
  margin-bottom: 20px;
  &:hover {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }
  .img_box {
    overflow: hidden;
    width: 45%;
    height: 100%;
    border-radius: 25px 0 0 25px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.6s;
      object-fit: cover;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }
  .card_content {
    overflow: hidden;
    padding: 0 15px;
    width: 55%;
    a {
      display: block;
      text-decoration: none;
      margin-bottom: 20px;
      color: $text-highlight-color;
      font-size: 2em;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: $text-bg-hover;
      }
    }
    .content_tag {
      color: #858585;
      font-size: 0.25rem;
    }
    .content_time,
    .content_category {
      display: -webkit-box;
      overflow: hidden;
      margin-bottom: 10px;
      div {
        display: inline-flex;
        align-items: center;
        .content_icon {
          font-size: 18px;
        }
        .gap {
          margin: 0 5px;
        }
        .text {
          margin-left: 5px;
        }
      }
    }
    .content_text {
      color: #4c4948;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      font-size: 16px;
    }
  }
}
</style>