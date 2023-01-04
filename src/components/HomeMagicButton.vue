<script setup lang="ts">
import { NButton, NPopover, NSpace } from "naive-ui";
import { store } from "@/store";

function backTop() {
  let el = document.querySelector(
    "#content > div > div.n-scrollbar-container > div"
  );
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function changeTheme() {
  store.changeTheme();
}

function openSettingPage() {
  store.showSettingPage = true;
}

function changeSiderVisible() {
  store.changeSiderVisible();
}
</script>

<template>
  <div class="more-btn">
    <n-popover trigger="click">
      <template #trigger>
        <n-button quaternary circle size="large">
          <span class="item-icon">💭</span>
        </n-button>
      </template>
      <div>
        <n-space vertical>
          <n-button quaternary circle size="large" @click="backTop">
            <span class="item-icon icon-wobble-vertical">🚀</span>
          </n-button>
          <n-button quaternary circle size="large" @click="changeSiderVisible">
            <span class="item-icon icon-swing">📜</span>
          </n-button>
          <n-button quaternary circle size="large" @click="changeTheme">
            <span class="item-icon icon-rotateY" v-if="store.isDarkTheme"
              >🧊</span
            >
            <span class="item-icon icon-flow" v-else>🌙</span>
          </n-button>
          <n-button quaternary circle size="large" @click="openSettingPage">
            <span class="item-icon icon-rotate">⚙️</span>
          </n-button>
        </n-space>
      </div>
    </n-popover>
  </div>
</template>

<style scoped>
.more-btn {
  padding-right: 24px;
}
.item-icon {
  font-size: 25px;
}
</style>
