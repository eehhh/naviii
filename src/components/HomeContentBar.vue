<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { NInput } from "naive-ui";
import { store } from "@/store";
import { LocalDB } from "@/assets/ts/db";
import { getSearchEngine, omniSearch } from "@/assets/ts/search";

const db = new LocalDB();
let searchRef = ref<HTMLElement | null>(null);
let searchEngine = reactive(store.searchEngine);
let searchContent = ref("");
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
  <div class="content-bar">
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
    </div>
  </div>
</template>

<style scoped>
.content-bar {
  top: 0px;
  height: 80px;
  z-index: 999;
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
.search-wrapper {
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
}
.search-prefix {
  color: rgba(0, 0, 0, 0.5);
}
.search-icon:hover {
  cursor: pointer;
}
</style>
