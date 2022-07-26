<script setup lang='ts'>
import { ref } from 'vue';
import { themeVars } from './config/vantThemeOverride';
import { useRouter, RouteLocationNormalized } from 'vue-router';

const isLoginPage = ref<boolean>();

const router = useRouter();
router.beforeEach(function guard(to: RouteLocationNormalized) {
  isLoginPage.value = to.path === '/login';
});
</script>

<template>
  <van-config-provider :theme-vars='themeVars'>
    <div class='iCost_main_app'>
      <router-view />
      <van-tabbar v-if='!isLoginPage' route>
        <van-tabbar-item replace to='/accounts' icon='cash-o'>Accounts</van-tabbar-item>
        <van-tabbar-item replace to='/statistics' icon='chart-trending-o'>Statistics</van-tabbar-item>
        <van-tabbar-item replace to='/user' icon='user-o'>User</van-tabbar-item>
      </van-tabbar>
    </div>
  </van-config-provider>
</template>

<style lang='less'>
@import 'normalize.css/normalize.css';
@import './App.less';
</style>
