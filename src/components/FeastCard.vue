<script setup>
import { defineProps } from "vue";
const props = defineProps({
  feastObj: Object
});
const feastData = props.feastObj;

</script>

<template>
  <div class="article_card">
    <div class="card_content">
      <a href="javascript:;">{{feastData.nickname}}发布的宴席</a>
      <div class="content_tag">
        <div class="content_time">
          <div>
            <el-icon color="rgb(131, 164, 255)" class="content_icon">
              <Calendar />
            </el-icon>
            <span class="text">宴席时间:{{feastData.date_time}}</span>
            <span class="gap">|</span>
          </div>
          <div>
            <el-icon color="rgb(131, 164, 255)" class="content_icon">
              <Timer />
            </el-icon>
            <span class="text">宴席规模:{{feastData.scale}}/桌</span>
            <span class="gap">|</span>
          </div>
          <div>
            <el-icon color="rgb(131, 164, 255)" class="content_icon">
              <PriceTag />
            </el-icon>
            <span class="text">期望价格:{{feastData.price}}/桌</span>
          </div>
        </div>
      </div>
      <div class="content_text">{{feastData.description}}</div>
    </div>
    <div class="totalk">
        <a href="#">和我联系</a>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.article_card {
  //   display: flex;
  //   align-items: center;
  height: 200px;
  border-radius: 25px;
  background: $card-bg;
  box-shadow: $card-box-shadow;
  transition: all 0.3s;
  margin-bottom: 20px;
  padding: 20px 10px;
  &:hover {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }
  .card_content {
    overflow: hidden;
    padding: 0 15px;
    width: 100%;
    a {
      display: block;
      text-decoration: none;
      margin-bottom: 20px;
      color: $text-highlight-color;
      font-size: 2em;
      transition: all 0.2s ease-in-out;
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
          font-size: 12px;
        }
      }
    }
    .content_text {
      color: #4c4948;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      font-size: 15px;
    }
  }
}
.totalk{
    float: right;
    a{
      font-size: 14px;
    }
  }
</style>