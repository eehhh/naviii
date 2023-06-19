<script setup lang="ts">
import { h, computed } from "vue";
import { NMenu, NButton, NTooltip } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { contentTheme } from "@/assets/ts/custom";
import { getMenuOptins } from "@/assets/ts/utils";
import { store } from "@/store";

let collapsed = computed(() => {
  switch (store.siderMode) {
    case 1:
      return true;
    default:
      return false;
  }
});
const siderStyle = computed(() => {
  switch (store.siderMode) {
    case 2:
      return {
        width: "200px",
        duration: "0s",
      };
    default:
      return {
        width: "50px",
        duration: "1s",
      };
  }
});
const fullMenuOptions = computed(() => {
  return getMenuOptins(store.bookMarks);
});

const renderMenuLabel = (option: MenuOption) => {
  if ("href" in option) {
    return h(
      "a",
      { href: option.href, target: store.openBookMarkJump },
      option.label as string
    );
  }
  return option.label as string;
};
const backTop = () => {
  let el = document.querySelector(
    "#cards-wrapper > div > div.n-scrollbar-container > div"
  );
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
const changeTheme = () => {
  store.changeTheme();
};
const openProject = () => {
  window.open("https://github.com/eehhh/naviii");
};
</script>

<template>
  <div
    class="sider"
    :style="{
      'background-image': store.isDarkTheme
        ? contentTheme.dark
        : contentTheme.light,
    }"
  >
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="50"
      :collapsed-icon-size="20"
      :options="fullMenuOptions"
      :render-label="renderMenuLabel"
    />
    <div class="tools" v-show="collapsed">
      <n-tooltip placement="right" trigger="hover">
        <template #trigger>
          <n-button quaternary circle size="medium" @click="backTop">
            <i
              class="item-icon icon-wobble-vertical fa-brands fa-space-awesome"
            ></i>
          </n-button>
        </template>
        回到顶部
      </n-tooltip>
      <n-tooltip placement="right" trigger="hover">
        <template #trigger>
          <n-button quaternary circle size="medium" @click="changeTheme">
            <i
              class="item-icon icon-rotateY fa-regular fa-lightbulb"
              :class="store.isDarkTheme ? 'light' : ''"
            ></i>
          </n-button>
        </template>
        切换主题
      </n-tooltip>
      <n-tooltip placement="right" trigger="hover">
        <template #trigger>
          <n-button quaternary circle size="medium" @click="openProject">
            <i class="item-icon icon-rotateY fa-brands fa-github"></i>
          </n-button>
        </template>
        项目地址
      </n-tooltip>
    </div>
  </div>
</template>

<style scoped>
.sider {
  top: 0;
  left: 0;
  position: absolute;
  width: v-bind("siderStyle.width");
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all v-bind("siderStyle.duration");
  z-index: 0;
}
.n-menu {
  flex: 1;
  height: 0;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}
.n-menu::-webkit-scrollbar {
  width: 0;
}
.tools {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}
.item-icon {
  font-size: 20px;
}
.n-button {
  margin-bottom: 10px;
}
.light {
  color: #ffcc33;
}
</style>
