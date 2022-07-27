<script setup lang='ts'>
import TextInput from './TextInput.vue';
</script>

<template>
  <div class='iCost_login_page'>
    <img class='banner' src='../../assets/banner.svg' alt='banner'>
    <div class='logo'>
      <span class='letter-i'>i</span>
      <span>COST</span>
    </div>
    <div class='login-form'>
      <text-input>
        <template #extra>
          <div class='send-code-button'>Send Code</div>
        </template>
      </text-input>
      <div class='submit-button'>LOGIN</div>
    </div>
  </div>
</template>

<style lang='less'>
.iCost_login_page {
  height: 100%;
  display: flex;
  padding: @primary-padding;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.banner {
  width: 200px;
}

.logo {
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  margin: 50px 0 20px;
  color: @primary-text-color;

  .letter-i {
    font-size: 45px;
    color: @primary-theme-color-2;
  }
}

.login-form {
  width: 100%;
}

.send-code-button {
  padding: 8px 10px;
  text-align: center;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 0 80px 0 rgba(100, 100, 100, .4);
}

.submit-button {
  color: white;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 20px;
  background-color: @primary-theme-color-2;
  box-shadow: 0 0 30px 0 rgba(40, 216, 161, 0.5);
}
</style>
