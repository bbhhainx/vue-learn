<template>
  <div v-for="order in orders" :key="order.id" class="order"
    @click="facade_order.selectAnOrder(order)"
  >
    <h2>Order ID: {{ order.id }}</h2>
    <p>Customer: {{ order.customer?.name }}</p>
    <p>Total: {{ order.total_price }}</p>
    <ul>
      <li v-for="product in order.products" :key="product.id">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  Customer,
  CustomerServiceImpl,
  Order,
  OrderOperationFacadeImpl,
  OrderServiceImpl,
  Product,
  ProductServiceImpl,
} from "../helper/facade";

/** thông tin của 1 đơn hàng */
const order = ref<Order>({});
/** danh sách đơn hàng */
const orders = ref<Order[]>([]);
/** danh sách sản phẩm */
const products = ref<Product[]>([]);
/** danh sách khách hàng */
const customers = ref<Customer[]>([]);

// services
const product_service = new ProductServiceImpl();
const customer_service = new CustomerServiceImpl();
const order_service = new OrderServiceImpl();

// facade
const facade_order = new OrderOperationFacadeImpl(
  product_service,
  customer_service,
  order_service,
  order,
  orders,
  products,
  customers
);

onMounted(() => {
  facade_order.init();
});
</script>
