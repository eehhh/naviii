<script setup lang="ts">
import type { StyleValue } from "vue";
import { ref, reactive, onMounted } from "vue";
import { NInput, NPopover, NSpace, NTooltip, NButton } from "naive-ui";
import { store } from "@/store";
import { LocalDB } from "@/assets/ts/db";
import { enginesMap } from "@/assets/ts/custom";
import { getSearchEngine, omniSearch } from "@/assets/ts/search";
import HomeMegicButton from "@/components/HomeMagicButton.vue";

const db = new LocalDB();
let searchRef = ref<HTMLElement | null>(null);
let searchEngine = reactive(store.searchEngine);
let searchContent = ref("");

const itemTooltip: StyleValue = {
  marginLeft: "20px",
  width: "max-content",
};

const props = defineProps<{
  sticky: boolean;
}>();

onMounted(() => {
  addEventListener("keyup", focusSearchInput);
  addEventListener("beforeunload", handleBeforeunload);
});

const stickyBar: StyleValue = {
  top: "0px",
  position: "sticky",
  background: "rgba(255, 255, 255, 0.3)",
  "backdrop-filter": "blur(10px)",
};
const relativeBar: StyleValue = {
  top: "10px",
  position: "relative",
};

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
  <div :style="props.sticky ? stickyBar : relativeBar" class="content-bar">
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
              <span class="search-prefix">{{ searchEngine.label }}</span>
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
    <HomeMegicButton />
  </div>
</template>

<style scoped>
.sticky-bar {
  top: 0px;
  position: sticky;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
.content-bar {
  display: flex;
  height: 80px;
  z-index: 999;
  justify-content: center;
  align-items: center;
}
.search-wrapper {
  width: 400px;
  padding-left: 25px;
  padding-right: 5px;
}
.search-prefix {
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.search-icon:hover {
  cursor: pointer;
}
</style>
