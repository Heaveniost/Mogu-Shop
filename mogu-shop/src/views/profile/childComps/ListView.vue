<template>
  <div class="list">
    <div class="item">
      <img src="~assets/img/profile/message.svg">
      <span>我的消息</span>
    </div>
    <div class="item">
      <img src="~assets/img/profile/pointer.svg">
      <span>积分商城</span>
    </div>
    <div class="item">
      <img src="~assets/img/profile/vip.svg">
      <span>会员卡</span>
    </div>
    <div class="item">
      <img src="~assets/img/profile/cart.svg">
      <span>我的购物车</span>
    </div>
    <div class="item">
      <img src="~assets/img/profile/shopping.svg">
      <span>下载购物APP</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",

  }
</script>

<style scoped>
  .list {
    background-color: #fff;
    font-size: 15px;
  }

  .item {
    line-height: 35px;
    position: relative;
  }

  img {
    width: 18px;
    height: 18px;
    display: block;
    float: left;
    position: absolute;
    top: 10px;
    left: 5px;
  }

  span {
    display: block;
    margin-left: 30px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding: 1px 0;
  }
</style>