<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-selected="isSelectAll" class="check-button" @click.native="selectItem" />
      <span>全选</span>
    </div>

    <div class="price">
      合计: <span class="total">￥{{ totalPrice }}</span>
    </div>

    <!-- <div class="calculate" @click="calcClick"> -->
    <div class="calculate">
      结算({{checkLength}})
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
        }
        return true
      },
      totalPrice() {
        return this.cartList.filter(item => {
          return item.isSelected
        }).reduce((total, item) => {
          return total + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.isSelected).length
      }
    },
    methods: {
      selectItem() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.isSelected = false)
        } else {
          this.cartList.forEach(item => item.isSelected = true)
        }
      }
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
    margin-left: 30px;
    flex: 1;
  }

  .total {
    font-size: 80%;
    color: red;
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