<script setup lang="ts">
import { NAvatar, NTooltip } from "naive-ui";
import { itemIconSize, itemTitleSize } from "@/assets/ts/custom";
import { getFullHref } from "@/assets/ts/utils";
import { store } from "@/store";

const props = defineProps<{
  title: string;
  href: string | undefined;
  icon?: string | null;
}>();
</script>

<template>
  <div class="item">
    <n-tooltip trigger="hover">
      <template #trigger>
        <a
          :href="getFullHref(props.href)"
          :target="store.openBookMarkJump"
          v-if="props.href"
        >
          <n-avatar
            round
            class="item-icon icon-swing"
            :size="itemIconSize"
            :src="props.icon ? props.icon : store.iconAPI + props.href"
            :fallback-src="store.iconAPI + props.href"
          />
        </a>
        <div v-else>
          <n-avatar round class="item-icon icon-swing" :size="itemIconSize" />
        </div>
      </template>
      <span>{{ props.href ? props.href : "未知" }}</span>
    </n-tooltip>
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <div class="item-title" :style="{ fontSize: `${itemTitleSize}px` }">
          {{ props.title }}
        </div>
      </template>
      <span>{{ props.title }}</span>
    </n-tooltip>
  </div>
</template>

<style scoped>
.item-icon {
  box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.2);
  /* filter: drop-shadow(1px 1px 6px rgba(0, 0, 0, 0.3)); */
}
.item-title {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
