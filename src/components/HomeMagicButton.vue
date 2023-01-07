<script setup lang="ts">
import type { StyleValue } from "vue";
import { NButton, NPopover, NSpace, NTooltip } from "naive-ui";
import { store } from "@/store";

const itemTooltip: StyleValue = {
  marginRight: "20px",
  width: "max-content",
};

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
    <n-popover trigger="hover">
      <template #trigger>
        <n-button quaternary circle size="large">
          <span class="item-icon icon-swing">💭</span>
        </n-button>
      </template>
      <div>
        <n-space vertical>
          <n-tooltip
            :style="itemTooltip"
            placement="left"
            :show-arrow="false"
            trigger="hover"
          >
            <template #trigger>
              <n-button quaternary circle size="large" @click="backTop">
                <span class="item-icon icon-wobble-vertical">🚀</span>
              </n-button>
            </template>
            回到顶部
          </n-tooltip>
          <n-tooltip
            :style="itemTooltip"
            placement="left"
            :show-arrow="false"
            trigger="hover"
          >
            <template #trigger>
              <n-button
                quaternary
                circle
                size="large"
                @click="changeSiderVisible"
              >
                <span class="item-icon icon-swing">📜</span>
              </n-button>
            </template>
            侧栏
          </n-tooltip>
          <n-tooltip
            :style="itemTooltip"
            placement="left"
            :show-arrow="false"
            trigger="hover"
          >
            <template #trigger>
              <n-button quaternary circle size="large" @click="changeTheme">
                <span class="item-icon icon-rotateY" v-if="store.isDarkTheme"
                  >🧊</span
                >
                <span class="item-icon icon-flow" v-else>🌙</span>
              </n-button>
            </template>
            主题
          </n-tooltip>
          <n-tooltip
            :style="itemTooltip"
            placement="left"
            :show-arrow="false"
            trigger="hover"
          >
            <template #trigger>
              <n-button quaternary circle size="large" @click="openSettingPage">
                <span class="item-icon icon-rotate">⚙️</span>
              </n-button>
            </template>
            设置
          </n-tooltip>
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
