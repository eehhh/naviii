<script setup lang="ts">
import { computed } from "vue";
import { NDrawer } from "naive-ui";
import HomeBar from "@/components/HomeBar.vue";
import SettingPage from "@/components/SettingPage.vue";
import SiteCards from "./SiteCards.vue";
import { contentTheme, settingPageWidth } from "@/assets/ts/custom";
import { store } from "@/store";

const contentStyle = computed(() => {
  switch (store.siderMode) {
    case 0:
      return {
        x: "0px",
        left: "0px",
      };
    case 1:
      return {
        x: "0px",
        left: "50px",
      };
    case 2:
      return {
        x: "200px",
        left: "0px",
      };
    default:
      return {
        x: "0px",
        left: "50px",
      };
  }
});
</script>

<template>
  <div
    class="content"
    :style="{
      'background-image': store.isDarkTheme
        ? contentTheme.dark
        : contentTheme.light,
    }"
  >
    <HomeBar />
    <SiteCards />
  </div>
  <n-drawer v-model:show="store.showSettingPage" :width="settingPageWidth">
    <SettingPage />
  </n-drawer>
</template>

<style scoped>
.content {
  top: 0;
  left: v-bind("contentStyle.left");
  position: absolute;
  width: calc(100% - v-bind("contentStyle.left"));
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateX(v-bind("contentStyle.x"));
  transition: all 0.6s;
  z-index: 1;
}
</style>
