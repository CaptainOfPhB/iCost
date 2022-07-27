<script setup lang='ts'>
import TextInput from './TextInput.vue';
</script>

<template>
  <div class='iCost_login_page'>
    <div class='logo'>
      <span class='letter-i'>i</span>
      <span>COST</span>
    </div>
    <div class='login-form'>
      <text-input>
        <template #extra>extra</template>
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

.logo {
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: @primary-theme-color-2;

  .letter-i {
    font-size: 45px;
    color: @primary-text-color;
  }
}

.login-form {
  width: 100%;
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
  box-shadow: 0 25px 95px 0 rgba(40, 216, 161, 0.3);
}
</style>
