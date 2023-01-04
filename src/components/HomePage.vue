<script setup lang="ts">
import { NLayout, NMessageProvider } from "naive-ui";
import HomeSider from "@/components/HomeSider.vue";
import HomeContent from "@/components/HomeContent.vue";
import { store } from "@/store";
</script>

<template>
  <n-message-provider>
    <n-layout has-sider position="absolute">
      <HomeSider v-if="store.showSider" />
      <HomeContent />
    </n-layout>
  </n-message-provider>
</template>

<style scoped></style>
