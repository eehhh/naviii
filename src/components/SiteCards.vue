<script setup lang="ts">
import { computed } from "vue";
import { NCard, NScrollbar } from "naive-ui";
import CardItem from "@/components/CardItem.vue";
import {
  cardItemWidth,
  cardTitlePrefix,
  firstCardTitle,
} from "@/assets/ts/custom";
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
        stack.push(item);
      }
    } else {
      if (item.items.length) {
        folder.push(item);
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
  <div id="cards-wrapper">
    <n-scrollbar>
      <n-card
        class="card"
        id="firstCard"
        :title="firstCardTitle"
        :bordered="false"
        v-if="bookMarks.stack.length"
        hoverable
      >
        <div class="items-wrapper">
          <CardItem
            :href="item.link"
            :title="item.title"
            :icon="item.favicon ? item.favicon : null"
            :key="encodeURI('first' + item.title + item.link + index)"
            v-for="(item, index) in bookMarks.stack"
          />
        </div>
      </n-card>
      <n-card
        class="card"
        :title="itemTitle(item)"
        :bordered="false"
        hoverable
        v-for="(item, index) in bookMarks.folder"
        :key="encodeURI(item.title + item.link + index)"
      >
        <div class="items-wrapper">
          <CardItem
            :href="subitem.link"
            :title="subitem.title"
            :icon="subitem.favicon ? subitem.favicon : null"
            :key="encodeURI(subitem.title + item.link + index1)"
            v-for="(subitem, index1) in item.items"
          />
        </div>
      </n-card>
    </n-scrollbar>
  </div>
</template>

<style scoped>
#cards-wrapper {
  flex: 1;
  height: 0;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 0px 20px;
  margin-bottom: 15px;
}
.card {
  border-radius: 10px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
.card:last-child {
  margin-bottom: 0px;
}
.items-wrapper {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, v-bind("cardItemWidth"));
  gap: 15px 30px;
}
</style>
