<template>
    <div class="toast" v-show="isShow">
      <div v-show="show" class="content">{{message}}</div>
    </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration) {
        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 99;        
  }
  .content {
    font-size: 12px;
    padding: 6px 8px;
    color: red;
    background-color:rgba(233, 178, 178, 0.7);
  }
</style>
