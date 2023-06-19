<script setup lang="ts">
import { NButton } from "naive-ui";
import { store } from "@/store";
import SearchBar from "@/components/SearchBar.vue";

const changeSiderMode = () => {
  store.changeSiderMode();
};

const openSettingPage = () => {
  store.showSettingPage = true;
};
</script>

<template>
  <div class="content-bar">
    <n-button quaternary circle size="medium" @click="changeSiderMode">
      <i class="item-icon icon-swing fas fa-bars"></i>
    </n-button>
    <SearchBar />
    <n-button quaternary circle size="medium" @click="openSettingPage">
      <i class="item-icon icon-rotate fas fa-gear"></i>
    </n-button>
  </div>
</template>

<style scoped>
.content-bar {
  display: flex;
  height: 80px;
  z-index: 999;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
}
.item-icon {
  font-size: 20px;
}
</style>
