<script setup lang="ts">
import { h, ref, computed } from "vue";
import { NLayoutSider, NMenu, NDrawer } from "naive-ui";
import type { MenuOption } from "naive-ui";
import SettingPage from "@/components/SettingPage.vue";
import { fixedMenuOptions, settingPageWidth } from "@/assets/ts/custom";
import { getMenuOptins } from "@/assets/ts/utils";
import { LocalDB } from "@/assets/ts/db";
import { store } from "@/store";

let db = new LocalDB();
let collapsed = ref(true);
let showSettingPage = ref(false);
const fullMenuOptions = computed(() => {
  return fixedMenuOptions(store.isDarkTheme).concat(
    getMenuOptins(store.bookMarks)
  );
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

function handleMenuValueUpdate(key: string, option: MenuOption) {
  if (key == "theme") {
    store.changeTheme();
    if (store.isDarkTheme) {
      option.icon = () => h("span", { class: "icon-rotateY" }, "🧊");
      db.theme = "dark";
    } else {
      option.icon = () => h("span", { class: "icon-flow" }, "🌙");
      db.theme = "light";
    }
  } else if (key == "top") {
    let el = document.querySelector(
      "#content > div > div.n-scrollbar-container > div"
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else if (key == "setting") {
    showSettingPage.value = true;
  }
}
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
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
      @update:value="handleMenuValueUpdate"
    />
    <n-drawer v-model:show="showSettingPage" :width="settingPageWidth">
      <SettingPage />
    </n-drawer>
  </n-layout-sider>
</template>
