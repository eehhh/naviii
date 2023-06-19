<script setup lang="ts">
import type { StyleValue } from "vue";
import { ref, reactive, onMounted } from "vue";
import { NInput, NPopover, NSpace, NTooltip, NButton, NAvatar } from "naive-ui";
import { LocalDB } from "@/assets/ts/db";
import { enginesMap } from "@/assets/ts/custom";
import { getSearchEngine, omniSearch } from "@/assets/ts/search";
import { store } from "@/store";

const db = new LocalDB();
let searchRef = ref<HTMLElement | null>(null);
let searchEngine = reactive(store.searchEngine);
let searchContent = ref("");
const itemTooltip: StyleValue = {
  marginLeft: "20px",
  width: "max-content",
};

onMounted(() => {
  addEventListener("keyup", focusSearchInput);
  addEventListener("beforeunload", handleBeforeunload);
});

const focusSearchInput = (e: KeyboardEvent) => {
  if (e.code == "Slash") {
    const el = searchRef.value;
    if (el) {
      el.focus();
    }
  }
};

const handleBeforeunload = () => {
  db.searchEngine = searchEngine;
};

const changeSearchEngine = (value: string) => {
  let { key, label } = getSearchEngine(value);
  searchEngine.key = key;
  searchEngine.label = label;
};

const handleKeyup = (e: KeyboardEvent) => {
  if (e.code == "Space" || e.key == "Unidentified") {
    changeSearchEngine(searchContent.value);
  } else if (e.code == "Enter") {
    omniSearch(searchEngine.key, searchContent.value);
  }
};

const getSearchIconSrc = (key: string) => {
  const url = enginesMap[key][1]
    .replace("http://", "")
    .replace("https://", "")
    .split("/")[0];
  return store.iconAPI + url;
};
</script>

<template>
  <div class="search-wrapper">
    <n-input
      ref="searchRef"
      round
      autofocus
      size="large"
      v-show="true"
      v-model:value="searchContent"
      @keyup="handleKeyup"
    >
      <template #prefix>
        <n-popover trigger="hover">
          <template #trigger>
            <n-avatar
              round
              class="search-prefix"
              :size="25"
              :src="getSearchIconSrc(searchEngine.key)"
            />
          </template>
          <n-space vertical>
            <n-tooltip
              :style="itemTooltip"
              placement="right"
              :show-arrow="false"
              trigger="hover"
              v-for="(v, k) in enginesMap"
              :key="k"
            >
              <template #trigger>
                <n-button
                  dashed
                  style="width: 125px"
                  @click="changeSearchEngine(k as string)"
                >
                  {{ v[0] }}
                </n-button>
              </template>
              输入关键字"{{ k }}"+空格切换
            </n-tooltip>
          </n-space>
        </n-popover>
      </template>
      <template #suffix>
        <span
          class="search-icon icon-zoom-in"
          @click="omniSearch(searchEngine.key, searchContent)"
          >🔎</span
        >
      </template>
    </n-input>
  </div>
</template>

<style scoped>
:deep(.n-input-wrapper) {
  padding: 0px 10px;
}
.search-wrapper {
  width: 450px;
  margin: 0px 8px;
}
.search-prefix {
  margin-right: 3px;
  cursor: pointer;
}
.search-icon:hover {
  cursor: pointer;
}
</style>
