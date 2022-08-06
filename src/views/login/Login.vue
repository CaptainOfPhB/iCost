<script setup lang='ts'>
import 'vant/es/notify/style';
import { showNotify } from 'vant';
import { reactive, Ref } from 'vue';
import { read } from '@/utils/axios';
import type { Rules, ValidateError } from 'async-validator';
import useCountDown from '@/hooks/useCountDown/useCountDown';
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator';

type Value = { emailAddress: string; verifyCode: string; }

const form = reactive({ emailAddress: '', verifyCode: '' });

const transform = (value: string) => value.trim();
const rules: Rules = {
  emailAddress: [
    { required: true, transform, message: 'Email is required' },
    { type: 'email', transform, whitespace: true, message: 'Email is not valid' },
  ],
  verifyCode: [
    { required: true, transform, message: 'Verify code is required' },
    { len: 6, transform, pattern: /^\d{6}$/g, message: 'Verify code must be 6 digits number' },
  ],
};

const { count, pending, startCountDown } = useCountDown(3, true);
const validateResult = useAsyncValidator(form, rules);
const errors = validateResult.errorFields as Ref<Record<keyof Value, ValidateError[]>>;

function sendCode() {
  if (pending.value) return;
  // TODO: request api.sendCode
  startCountDown();
}

async function login() {
  if (!validateResult.pass.value) {
    showNotify({ type: 'danger', message: 'The login parameters are not valid' });
    return;
  }
  const response = await read({ url: '/tags' });
  console.log(response);
}
</script>

<template>
  <div class="iCost_login_page">
    <img class="banner" src="@/assets/banner.svg" alt="banner" />
    <div class="logo">
      <span class="letter-i">i</span>
      <span>COST</span>
    </div>
    <div class="login-form">
      <text-input v-model="form.emailAddress" placeholder="Email Address" :errors="errors.emailAddress" />
      <text-input v-model="form.verifyCode" placeholder="Verify Code" :errors="errors.verifyCode">
        <template #extra>
          <div :class="['send-code-button', pending ? 'disabled' : '']" @click="sendCode">
            <span v-if="pending" class="resend-text">Resend({{ count }}s)</span>
            <span v-else>Send Code</span>
          </div>
        </template>
      </text-input>
      <div class="submit-button" @click="login">LOGIN</div>
      <div class="tips">If you are not registered, we will register your email automatically via login.</div>
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
  background-color: white;
}

.banner {
  width: 200px;
  margin-top: 30px;
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
  box-shadow: 0 0 80px 0 rgba(100, 100, 100, 0.4);

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

.tips {
  font-size: 14px;
  margin-top: 8px;
  color: @primary-text-color;
}

.van-notify--danger {
  background-color: @primary-red-color-light;
}
</style>
