<script setup lang="ts">
import { NGlobalStyle, NConfigProvider, darkTheme, zhCN, dateZhCN } from "naive-ui";
import HomePage from "@/components/HomePage.vue";
import { store } from "@/store";
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="store.isDarkTheme ? darkTheme : null"
  >
    <HomePage />
    <n-global-style />
  </n-config-provider>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
