<script setup lang="ts">
import { ref } from "vue";
import {
  NDrawerContent,
  NTabs,
  NTabPane,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  NButton,
  NSpace,
  NSelect,
  NUpload,
  useMessage,
} from "naive-ui";
import type { UploadFileInfo } from "naive-ui";
import { oneDark } from "@codemirror/theme-one-dark";
import { store } from "@/store";
import { LocalDB } from "@/assets/ts/db";

const message = useMessage();
const db = new LocalDB();
let inputIconAPI = ref(store.iconAPI);
let inputBookMarks = ref(JSON.stringify(store.bookMarks, null, 2));
let searchSelectValue = ref(store.searchJump);
let searchSelectOptions = [
  {
    label: "在当前页面打开搜索页",
    value: "_self",
  },
  {
    label: "在新页面打开搜索页",
    value: "_blank",
  },
];
let openSelectValue = ref(store.openBookMarkJump);
let openSelectOptions = [
  {
    label: "在当前页面打开书签页",
    value: "_self",
  },
  {
    label: "在新页面打开书签页",
    value: "_blank",
  },
];

function saveData() {
  try {
    if (inputIconAPI.value[inputIconAPI.value.length - 1] != "/") {
      inputIconAPI.value += "/";
    }
    store.setIconAPI(inputIconAPI.value);
    if (inputIconAPI.value == "") {
      inputIconAPI.value = store.iconAPI;
    }
    store.setBookMarks(inputBookMarks.value);
    if (inputBookMarks.value == "") {
      inputBookMarks.value = JSON.stringify(store.bookMarks, null, 2);
    }
    store.setSearchJump(searchSelectValue.value);
    store.setOpenBookMarkJump(openSelectValue.value);
    message.success("保存成功！");
  } catch {
    message.success("保存失败！");
  }
}

function clearData() {
  db.clear();
  message.success("数据已清除 即将刷新页面！");
  setTimeout(() => {
    location.reload();
  }, 3000);
}

function exportData() {
  db.exportToJson();
}

function importData(fileList: UploadFileInfo[]) {
  if (fileList.length && fileList[0].file) {
    const file = fileList[0].file;
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function () {
      if (typeof reader.result == "string") {
        try {
          let data = JSON.parse(reader.result);
          for (let key in data) {
            if (db.keys.includes(key)) {
              // console.log(key, data[key])
              db.setItem(key, data[key]);
            }
          }
          message.success("数据导入成功 即将刷新页面！");
          setTimeout(() => {
            location.reload();
          }, 3000);
        } catch (e) {
          console.log("Error:", e);
          message.error("数据导入失败！\n" + e, {
            duration: 10000,
          });
        }
      }
    };
  }
}
</script>

<template>
  <n-drawer-content :native-scrollbar="false">
    <template #header> 设置 </template>
    <n-tabs type="segment">
      <n-tab-pane name="Base" tab="基础">
        <n-space vertical>
          <n-input-group>
            <n-input-group-label>iconAPI</n-input-group-label>
            <n-input v-model:value="inputIconAPI" />
          </n-input-group>
          <n-select
            v-model:value="searchSelectValue"
            :options="searchSelectOptions"
          />
          <n-select
            v-model:value="openSelectValue"
            :options="openSelectOptions"
          />
          <n-upload
            class="base-item"
            :trigger-style="{ width: '100%' }"
            :show-file-list="false"
            @update:file-list="importData"
          >
            <n-button class="base-item" strong secondary type="info">
              导入数据
            </n-button>
          </n-upload>
          <n-button
            class="base-item"
            strong
            secondary
            type="info"
            @click="exportData"
          >
            导出数据
          </n-button>
          <n-button
            class="base-item"
            strong
            secondary
            type="error"
            @click="clearData"
          >
            清除数据
          </n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="BookMarks" tab="书签">
        <VueCodemirror
          v-model="inputBookMarks"
          :extensions="store.isDarkTheme ? [oneDark] : []"
        />
      </n-tab-pane>
    </n-tabs>
    <template #footer>
      <n-button
        class="base-item"
        strong
        secondary
        type="primary"
        @click="saveData"
      >
        保存
      </n-button>
    </template>
  </n-drawer-content>
</template>

<style scoped>
.base-item {
  width: 100%;
}
</style>
