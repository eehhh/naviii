<script setup lang="ts">
import { ref, computed } from "vue";
import { NGrid, NGridItem, NLayoutContent, NCard, NDrawer } from "naive-ui";
import HomeCardItem from "@/components/HomeCardItem.vue";
import HomeContentBar from "@/components/HomeContentBar.vue";
import SettingPage from "@/components/SettingPage.vue";
import {
  itemCols,
  contentTheme,
  firstCardTitle,
  cardTitlePrefix,
  settingPageWidth,
} from "@/assets/ts/custom";
import type { BookMarks, oneBookMark, mutiBookMark } from "@/assets/ts/types";
import { store } from "@/store";

const showStickyBar = ref(false);
const itemTitle = (item: BookMarks) => {
  return (item.menuIcon ? item.menuIcon : cardTitlePrefix) + " " + item.title;
};
const bookMarks = computed(() => {
  let stack = [];
  let folder = [];
  for (let item of store.bookMarks) {
    if (!item.items) {
      if (item.link) {
        stack.push(item as oneBookMark);
      }
    } else {
      if (item.items.length) {
        folder.push(item as mutiBookMark);
      }
    }
  }
  return {
    stack: stack,
    folder: folder,
  };
});

function handleScroll(e: Event) {
  const el = e.target as Element;
  const scrollTop = el.scrollTop;
  if (scrollTop > 25) {
    showStickyBar.value = true;
  } else {
    showStickyBar.value = false;
  }
}
</script>

<template>
  <n-layout-content
    id="content"
    :style="{
      'background-image': store.isDarkTheme
        ? contentTheme.dark
        : contentTheme.light,
    }"
    :native-scrollbar="false"
    @scroll="handleScroll"
  >
    <HomeContentBar :sticky="showStickyBar" />
    <div class="card-wrapper">
      <n-card
        class="card"
        id="firstCard"
        :title="firstCardTitle"
        :bordered="false"
        v-if="bookMarks.stack.length"
        hoverable
      >
        <n-grid :y-gap="15" :cols="itemCols">
          <n-grid-item
            v-for="(item, index) in bookMarks.stack"
            :key="item.title + index"
          >
            <HomeCardItem
              :href="item.link"
              :title="item.title"
              :icon="item.favicon ? item.favicon : null"
            />
          </n-grid-item>
        </n-grid>
      </n-card>
      <n-card
        class="card"
        :title="itemTitle(item)"
        :bordered="false"
        hoverable
        v-for="(item, index) in bookMarks.folder"
        :key="item.title + index"
      >
        <n-grid :y-gap="15" :cols="itemCols">
          <n-grid-item
            v-for="(subitem, index1) in item.items"
            :key="subitem.title + index1"
          >
            <HomeCardItem
              :href="subitem.link"
              :title="subitem.title"
              :icon="subitem.favicon ? subitem.favicon : null"
            />
          </n-grid-item>
        </n-grid>
      </n-card>
    </div>
  </n-layout-content>
  <n-drawer v-model:show="store.showSettingPage" :width="settingPageWidth">
    <SettingPage />
  </n-drawer>
</template>

<style scoped>
.card-wrapper {
  padding: 24px;
}
.card {
  border-radius: 10px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
</style>
