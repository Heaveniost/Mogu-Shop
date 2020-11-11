<template>
  <div id="user-info">
    <div ><img src="~assets/img/profile/avatar.svg" class="user-avatar"></div>
    <div class="login-info">
      <div name="user-nickname">
        <div>登录/注册</div>
      </div>
      <div class="phone">
        <span>
          <img src="~assets/img/profile/phone.svg" class="phone-img">
        </span>
        <slot name="user-phone">暂无绑定手机号</slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userInfo"
  }
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
    height: 80px;
    font-size: 14px;
    color: white;
    position: relative;
  }
  .user-avatar {
    width: 55px;
    height: 55px;
    float: left;
    position: absolute;
    bottom: 20px;
  }
  .login-info {
    margin-left: 70px;
  }
  .phone {
    margin-left: -5px;
    font-size: 12px;
  }
  .phone-img {
    width: 18px;
    height: 18px;
    position: relative;
    top: 4px;
  }
</style>