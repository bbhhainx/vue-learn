<template>
<div class="h-dvh">
    <VirtualList :items="listItems" :item_height="30" :overscan_count="5">
      <template #item="{ item }">
        {{ (item as (typeof listItems)[0]).content }}
      </template>
    </VirtualList>
  </div>
  <!-- <DynamicVirtualList :items="listItems" :estimated-height="50">
    <template #default="{ item }">
      <div class="border" :style="`height: ${item.height}px`">{{ item.content }}</div>
    </template>
  </DynamicVirtualList> -->
  <!-- <div style="height: 100dvh;overflow: hidden; display: flex; flex-direction: column;"> -->
  <!-- <DynamicScroller :items="listItems" :min-item-size="54">
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
          :data-active="active"
        >
          <div class="border" :style="`height: ${item.height}px;min-height: 50px`">
            {{ item.content }}
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller> -->
  <!-- <VirtualScroll /> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import DynamicVirtualList from "./components/DynamicVirtualList.vue";
import VirtualScroll from "./components/VirtualScroll.vue";
import VirtualList from "./components/VirtualList.vue";
interface ListItem {
  id: number;
  content: string;
  height: number;
}

const listItems: ListItem[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  content: `Item ${i + 1}`,
  height: Math.random() * 100,
}));
</script>