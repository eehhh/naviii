<script setup lang="ts">
import { computed } from "vue";
import { NGrid, NGridItem, NLayoutContent, NCard } from "naive-ui";
import HomeCardItem from "@/components/HomeCardItem.vue";
import HomeContentBar from "@/components/HomeContentBar.vue";
import {
  itemCols,
  contentTheme,
  firstCardTitle,
  cardTitlePrefix,
} from "@/assets/ts/custom";
import type { BookMarks, oneBookMark, mutiBookMark } from "@/assets/ts/types";
import { store } from "@/store";

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
  >
    <HomeContentBar />
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
