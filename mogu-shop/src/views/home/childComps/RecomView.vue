<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecomView',
    props: {
      recommends: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
/* 样式的问题 等最后再来修饰 */
    .recommend {
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;

        padding: 10px 0 20px;
        border-bottom: 10px solid #eee;
    }
    .recommend-item {
        flex: 1;
    }
    .recommend img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
</style>
