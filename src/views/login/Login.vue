<script setup lang='ts'>
import { ref } from 'vue';
import TextInput from '../../components/TextInput';
import useCountDown from '../../hooks/useCountDown/useCountDown';

const verifyCode = ref<string>();
const emailAddress = ref<string>();

const { count, pending, startCountDown } = useCountDown(3, true);

function sendCode() {
  if (pending.value) return;
  // TODO: request api.sendCode
  startCountDown();
}

function login() {
  console.log(emailAddress.value);
  console.log(verifyCode.value);
}
</script>

<template>
  <div class='iCost_login_page'>
    <img class='banner' src='../../assets/banner.svg' alt='banner'>
    <div class='logo'>
      <span class='letter-i'>i</span>
      <span>COST</span>
    </div>
    <div class='login-form'>
      <text-input
        v-model='emailAddress'
        type='email'
        :required='true'
        class='email-address'
        placeholder='Email Address'
        :validate='/^[\S\d.]+@[\S\d]+\.[\S\d]+$/g'
        validate-message='Please enter a valid email address'
      />
      <text-input
        v-model='verifyCode'
        class='verify-code'
        placeholder='Verify Code'
        :required='true'
        :validate='/^\d{6}$/g'
        validate-message='Please enter a 6-bits verify code'
      >
        <template #extra>
          <div
            :class='["send-code-button", pending ? "disabled":""]'
            @click='sendCode'
          >
            <span v-if='pending' class='resend-text'>Resend({{ count }}s)</span>
            <span v-else>Send Code</span>
          </div>
        </template>
      </text-input>
      <div class='submit-button' @click='login'>LOGIN</div>
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
  width: 110px;
  padding: 8px 0;
  text-align: center;
  border-radius: 2px;
  background-color: white;
  transition: all 0.5s ease-in-out;
  box-shadow: 0 0 80px 0 rgba(100, 100, 100, .4);

  &.disabled {
    box-shadow: none;
    background-color: @primary-background-color-light;
  }

  .resend-text {
    color: @primary-text-color-light;
  }
}

.submit-button {
  color: white;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  background-color: @primary-theme-color-2;
  box-shadow: 0 0 30px 0 rgba(40, 216, 161, 0.5);
}
</style>
