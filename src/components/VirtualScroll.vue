<template>
  <div class="dynamic-scroller-demo">
    <div class="toolbar">
      <input
        v-model="search"
        placeholder="Filter..."
      />
      <span
        >({{ updateParts.viewStartIdx }} - [{{ updateParts.visibleStartIdx }} -
        {{ updateParts.visibleEndIdx }}] - {{ updateParts.viewEndIdx }})</span
      >
    </div>

    <DynamicScroller
      :items="orders"
      :min-item-size="54"
      :emit-update="true"
      class="scroller"
      @resize="onResize"
      @update="onUpdate"
    >
      <template #before>
        <div class="notice">The message heights are unknown.</div>
      </template>
      <template #after>
        <div class="notice">You have reached the end.</div>
      </template>
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
          :data-active="active"
          class="message"
        >
          <!-- <div class="avatar">
            <img
              :key="item.avatar"
              :src="item.avatar"
              alt="avatar"
              class="image"
            />
          </div>
          <div class="text">
            {{ item.message }}
          </div>
          <div class="index">
            <span>{{ item.id }} (id)</span>
            <span>{{ index }} (index)</span>
          </div> -->
          <OrderItem
            :order="item"
            />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { generateMessage, token } from '../data'
import { Order } from '../interfaces';
import OrderItem from './OrderItem.vue';
import { isSameDay } from 'date-fns';

const items = ref<any[]>([])
const orders = ref<any[]>([])
const search = ref('')
const updateParts = ref({
  viewStartIdx: 0,
  viewEndIdx: 0,
  visibleStartIdx: 0,
  visibleEndIdx: 0,
})

onMounted(() => {
//   for (let i = 0; i < 100; i++) {
//     items.value = [...items.value, { id: i, ...generateMessage() }]
//   } 
  getOrders()
})

/** Lấy danh sách order */
async function getOrders() {
  try {
    orders.value = await getOrder({ body: {} })
    console.log(orders.value);
    
  } catch (e) {
    console.log(e)
  }
}
async function getOrder({ body }: any) {
  let res = await fetch('https://api-product.merchant.vn/order/get_order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token-business': token
    },
    body: JSON.stringify({
      ...body,
    }),
  })
  return res.json()
}
const filteredItems = computed(() => {
  if (!search) return items
  const lowerCaseSearch = search.value.toLowerCase()
  return items.value.filter((i) =>
    i.message.toLowerCase().includes(lowerCaseSearch)
  )
})
function changeMessage(message: string) {
  Object.assign(message, generateMessage())
}

function onResize() {
  console.log('resize')
}
function onUpdate(
  viewStartIndex: number,
  viewEndIndex: number,
  visibleStartIndex: number,
  visibleEndIndex: number
) {
  updateParts.value.viewStartIdx = viewStartIndex
  updateParts.value.viewEndIdx = viewEndIndex
  updateParts.value.visibleStartIdx = visibleStartIndex
  updateParts.value.visibleEndIdx = visibleEndIndex
}
</script>

<style scoped>
.dynamic-scroller-demo {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scroller {
  flex: auto 1 1;
}

.scroller {
  border: solid 1px #42b983;
}

.toolbar {
  flex: auto 0 0;
  text-align: center;
}

.toolbar > *:not(:last-child) {
  margin-right: 24px;
}

.notice {
  padding: 24px;
  font-size: 20px;
  color: #999;
}

.message {
  display: flex;
  min-height: 32px;
  padding: 12px;
  box-sizing: border-box;
}

.avatar {
  flex: auto 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.avatar .image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.index,
.text {
  flex: 1;
}

.text {
  max-width: 400px;
}

.index {
  opacity: 0.5;
}

.index span {
  display: inline-block;
  width: 160px;
  text-align: right;
}
</style>
