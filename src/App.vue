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
  <van-config-provider class='iCost_main_app' :theme-vars='themeVars'>
    <router-view v-slot='{ Component, route }'>
      <transition :name='route.meta.transition || "van-fade"' mode='out-in'>
        <component :is='Component' :key='route.name' />
      </transition>
    </router-view>
    <transition mode='in-out' name='van-slide-up'>
      <van-tabbar v-if='!isLoginPage' route>
        <van-tabbar-item replace to='/accounts' icon='cash-o'>Accounts</van-tabbar-item>
        <van-tabbar-item replace to='/statistics' icon='chart-trending-o'>Statistics</van-tabbar-item>
        <van-tabbar-item replace to='/user' icon='user-o'>User</van-tabbar-item>
      </van-tabbar>
    </transition>
  </van-config-provider>
</template>

<style lang='less'>
@import 'normalize.css/normalize.css';

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

#app {
  height: 100%;
  font-size: 16px;
  min-height: 100%;
  color: @primary-text-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: @primary-background-color;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.iCost_main_app {
  height: 100%;
}

.van-tabbar-item {
  font-weight: 500;

  .van-tabbar-item__icon {
    padding: 5px 0;
    border-radius: 16px;
    transition: all 0.2s ease-in-out;
  }

  &--active {
    .van-tabbar-item__icon {
      padding: 5px 20px;
      background-color: @primary-theme-color-3;
    }
  }
}
</style>
