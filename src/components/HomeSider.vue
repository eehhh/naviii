<script setup lang="ts">
import { h, ref, computed } from "vue";
import { NLayoutSider, NMenu } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { contentTheme } from "@/assets/ts/custom";
import { getMenuOptins } from "@/assets/ts/utils";
import { store } from "@/store";

let collapsed = ref(true);
const fullMenuOptions = computed(() => {
  return getMenuOptins(store.bookMarks);
});

function renderMenuLabel(option: MenuOption) {
  if ("href" in option) {
    return h(
      "a",
      { href: option.href, target: store.openBookMarkJump },
      option.label as string
    );
  }
  return option.label as string;
}
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :style="{
      'background-image': store.isDarkTheme
        ? contentTheme.dark
        : contentTheme.light,
    }"
    :native-scrollbar="false"
    :collapsed-width="50"
    :width="200"
    :collapsed="collapsed"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="50"
      :collapsed-icon-size="20"
      :options="fullMenuOptions"
      :render-label="renderMenuLabel"
    />
  </n-layout-sider>
</template>

<style scoped>
.n-layout-sider {
  --n-border-color: rgba(255, 255, 255, 0.05) !important;
}
.n-menu {
  height: 100vh;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}
</style>
