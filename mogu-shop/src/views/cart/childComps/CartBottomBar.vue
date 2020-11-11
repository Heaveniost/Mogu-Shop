<template>
  <div class="bottom-bar">
    <div class="check-content">
      <!-- <check-button :is-checked="isSelectAll" class="check-button" 
          @click.native="checkClick"/> -->
      <check-button :isSelected="isSelectAll" class="check-button" />
      <span>全选</span>
    </div>

    <div class="price">
      <!-- 合计：{{totalPrice}} -->
      合计：**
    </div>

    <!-- <div class="calculate" @click="calcClick"> -->
    <div class="calculate">
      <!-- 去计算({{checkLength}}) -->
      结算
    </div>
  </div>
</template>

<script>
  import checkButton from 'components/content/checkButton/checkButton'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      checkButton
    },
    computed: {
      ...mapGetters(['cartList']),
      isSelectAll() {
        if (this.cartList.length === 0) return false
        for (let item of this.cartList) {
          if (!item.isSelected) {
            return false
          }
          return true
        }
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 130px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    text-align: center;
    background-color: rgb(206, 83, 38);
    color: #fff;
    border-radius: 20px;
    border-right: 15px;
  }
</style>