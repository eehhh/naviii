<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { NGrid, NGridItem, NLayoutContent, NCard, NInput } from "naive-ui";
import HomeCardItem from "@/components/HomeCardItem.vue";
import {
  itemCols,
  contentTheme,
  firstCardTitle,
  cardTitlePrefix,
} from "@/assets/ts/custom";
import { getSearchEngine, omniSearch } from "@/assets/ts/search";
import { LocalDB } from "@/assets/ts/db";
import type { BookMarks, oneBookMark, mutiBookMark } from "@/assets/ts/types";
import { store } from "@/store";

const db = new LocalDB();
let searchRef = ref<HTMLElement | null>(null);
let searchEngine = reactive(store.searchEngine);
let searchContent = ref("");
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

onMounted(() => {
  addEventListener("keyup", focusSearchInput);
  addEventListener("beforeunload", handleBeforeunload);
});

function focusSearchInput(e: KeyboardEvent) {
  // console.log(e);
  if (e.code == "Slash") {
    const el = searchRef.value;
    if (el) {
      el.focus();
    }
  }
}

function changeSearchEngine(value: string) {
  let { key, label } = getSearchEngine(value);
  searchEngine.key = key;
  searchEngine.label = label;
}
function handleKeyup(e: KeyboardEvent) {
  // console.log(e);
  if (e.code == "Space" || e.key == "Unidentified") {
    changeSearchEngine(searchContent.value);
  } else if (e.code == "Enter") {
    omniSearch(searchEngine.key, searchContent.value);
  }
}
function handleBeforeunload() {
  db.searchEngine = searchEngine;
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
    content-style="padding: 24px"
    :native-scrollbar="false"
  >
    <n-input
      ref="searchRef"
      class="search-input"
      round
      autofocus
      size="large"
      v-show="true"
      v-model:value="searchContent"
      @keyup="handleKeyup"
    >
      <template #prefix>
        <span class="search-prefix">{{ searchEngine.label }}</span>
      </template>
      <template #suffix>
        <span
          class="search-icon icon-zoom-in"
          @click="omniSearch(searchEngine.key, searchContent)"
          >🔎</span
        >
      </template>
    </n-input>
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
  </n-layout-content>
</template>

<style scoped>
.search-input {
  margin-bottom: 24px;
}
.search-prefix {
  color: rgba(0, 0, 0, 0.5);
}
.search-icon:hover {
  cursor: pointer;
}
.card {
  border-radius: 10px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
</style>
