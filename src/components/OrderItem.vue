<template>
    <div
      class="p-2 flex justify-between font-medium border-b hover:bg-slate-200 hover:rounded-lg cursor-pointer"
      @click="props.order && props.selectOrder && props.selectOrder(props.order)"
    >
      <div class="flex gap-2">
        <img
          v-if="!props?.order?.contact_info?.avatar"
          :src="GreenCube"
          class="w-10 h-10 rounded-full"
        />
        <img
          v-if="props?.order?.contact_info?.avatar"
          :src="props?.order.contact_info.avatar"
          class="w-10 h-10 rounded-full"
        />
        <div class="flex flex-col justify-center">
          <p>
            {{ props?.order && getFullName(props?.order) }}
          </p>
          <p class="text-slate-700 text-xs">
            #{{ props?.order?.order_id }} -
            {{ props?.order?.created_date && format(props?.order?.created_date, 'hh:mm dd/MM') }}
          </p>
        </div>
      </div>
      <div class="flex flex-col props?.orders-end">
        <p class="font-semibold text-end">
          {{ currency(props?.order?.total_money) || 0 }}đ
        </p>
        <div v-if="!props?.order?.order_journey">
          <div
            class="flex props?.orders-center gap-2"
            v-if="props?.order?.custom_fields?.sales_channel === 'offline'"
          >
            <button
              class="text-xs px-2 py-0.5 rounded-md text-white bg-green-500"
            >
              Thành công
            </button>
          </div>
          <div
            class="flex props?.orders-center gap-2"
            v-if="props?.order?.custom_fields?.sales_channel === 'online'"
          >
            <button
              class="text-xs px-2 py-0.5 rounded-md text-white"
              v-if="
                props?.order.status &&
                props?.order.status !== 'CANCELED' &&
                props?.order.status !== 'REFUND'
              "
              :class="status_list[props?.order.status]?.bg"
            >
              {{ status_list[props?.order.status]?.name }}
            </button>
            <button
              class="text-xs px-2 py-0.5 rounded-md text-white bg-red-500"
              v-if="props?.order.status && props?.order.status === 'CANCELED'"
            >
              Hủy đơn
            </button>
            <button
              class="text-xs px-2 py-0.5 rounded-md text-white bg-red-700"
              v-if="props?.order.status && props?.order.status === 'REFUND'"
            >
              Hoàn đơn
            </button>
          </div>
        </div>
        <div v-if="props?.order?.order_journey">
          <div v-for="(step, index) in props?.order.order_journey">
            <div v-if="getLastStatus(props?.order) === index">
              <button
                v-for="(status, status_index) in step"
                v-show="status.is_active"
                :class="`${status.bg_color} ${status.text_color} text-xs px-2 py-0.5 rounded-md`"
              >
                <p class="w-fit lg:max-w-20 truncate">
                  {{ status.title }}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { status_list } from '../order_status'
  import { currency } from '../format';
  import { format } from 'date-fns';
  
  //* Icons
  import GreenCube from '../assets/vue.svg'
  
  //* Interfaces
  import { Order } from '../interfaces';
  
  //* props
  const props = defineProps<{
    order?: Order
    selectOrder?: (item: Order) => void
  }>()
  
  /** Lấy trạng thái cuối đang được kích hoạt */
  function getLastStatus(order: Order) {
    let order_journey = order.order_journey || []
    let index = 0
    order_journey.map((step, index_step) => {
      step.map((status, index_status) => {
        if (status.is_active) index = index_step
      })
    })
    return index
  }
  
  /** lấy tên đầy đủ */
  function getFullName(item: Order) {
    let firt_name = item.contact_info?.last_name || ''
    let last_name = item.contact_info?.first_name || ''
    return firt_name + ' ' + last_name
  }
  
  </script>