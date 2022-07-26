<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { themeVars } from './config/vantThemeOverride';

const route = useRoute();
const isLoginPage = route.path === '/login';
</script>

<template>
  <van-config-provider :theme-vars='themeVars'>
    <div class='iCost_main_app'>
      <router-view />
      <van-tabbar v-if='!isLoginPage' route>
        <van-tabbar-item replace to='/accounts' icon='cash-o'>Accounts</van-tabbar-item>
        <van-tabbar-item replace to='/statistics' icon='chart-trending-o'>Statistics</van-tabbar-item>
        <van-tabbar-item replace :to='{ name: "user", params: { userId: 123 } }' icon='user-o'>User</van-tabbar-item>
      </van-tabbar>
    </div>
  </van-config-provider>
</template>

<style lang='less'>
@import "normalize.css/normalize.css";
@import './App.less';
</style>
