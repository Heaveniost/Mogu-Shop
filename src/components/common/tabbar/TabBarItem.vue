<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick" >
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else class="item-active-icon"><slot name="item-active-icon"></slot></div>
    <div :class="{ itemText: isActive}"><slot name="item-text"></slot></div>
    <!--<img src="../../assets/img/tabbar/home.svg" alt="">-->
    <!--<div>首页</div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: {
        type: String,
        required: true
        }
    },
    // data() {
    //   return {
    //     isActive: false
    //   }
    // },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) != -1
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path).catch(() => {}) //防止重复点击报错
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 10px;
    /* color: red; */
    /* letter-spacing: 0.5ch; 设置字体间距后文字往左偏移了 */
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .itemText {
    color: red;
  }
</style>
