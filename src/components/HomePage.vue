<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
import HomeSider from "@/components/HomeSider.vue";
import HomeContent from "@/components/HomeContent.vue";
</script>

<template>
  <n-message-provider>
    <HomeSider />
    <HomeContent />
  </n-message-provider>
</template>

<style scoped></style>
