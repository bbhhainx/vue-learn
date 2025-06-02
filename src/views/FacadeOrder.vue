<template>
  <div
    v-for="(order, index) in orders"
    :key="order.id"
    class="order"
    @click="selectOrder(order)"
  >
    <h2>Order ID: {{ order.id }}</h2>
    <p>Customer: {{ order.customer?.name }}</p>
    <p>Total: {{ order.total_price }}</p>
    <ul>
      <li
        class="pl-10"
        v-for="(product, idx) in order.products"
        :key="product.id"
      >
        <p>{{ product.name }} - {{ product.price }} - {{ product.quantity }} - {{ product.total_price }}</p>
        <div>
          <button @click="changeProductQuantity(idx, index, 'increase')">
            Tăng
          </button>
          <button @click="changeProductQuantity(idx, index, 'decrease')">
            Giảm
          </button>
          <button @click="deleteProduct(idx, index)">Xoá</button>
        </div>
        <br />
      </li>
    </ul>
    <br />
    <br />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  Customer,
  Order,
  OrderOperationFacadeImpl,
  Product,
} from "../helper/facade";

/** thông tin của 1 đơn hàng */
const order = ref<Order>({});
/** danh sách đơn hàng */
const orders = ref<Order[]>([]);
/** danh sách sản phẩm */
const products = ref<Product[]>([]);
/** danh sách khách hàng */
const customers = ref<Customer[]>([]);

// facade
const $facade_order = new OrderOperationFacadeImpl();

onMounted(() => {
  /** dữ liệu hiển thị */
  const DATA = $facade_order.init();

  // lưu lại
  orders.value = DATA.orders;
  customers.value = DATA.customers;
  products.value = DATA.products;
});

/** hàm chọn 1 đơn hàng */
function selectOrder(data: Order) {
  order.value = $facade_order.selectAnOrder(data);
}

/** tăng số lượng 1 sản phẩm */
function changeProductQuantity(
  index: number,
  order_index: number,
  type: "increase" | "decrease"
) {
  /** đơn hàng đang cần tăng số lượng sản phẩm */
  const ORDER = orders.value[order_index];

  /** sản phẩm cần chỉnh sửa số lượng */
  const PRODUCT = ORDER.products?.[index];

  // nếu không có sản phẩm thì không làm gì
  if (!PRODUCT) return;

  // nếu là giảm số lượng
  if (type === "decrease") {
    PRODUCT.quantity = Math.max(0, (PRODUCT.quantity || 0) - 1);
  }

  // nếu là tăng số lượng
  if (type === "increase") {
    PRODUCT.quantity = (PRODUCT.quantity || 0) + 1;
  }

  // tính toán lại tổng giá của sản phẩm đó trong đơn hàng
  PRODUCT.total_price = (PRODUCT.price || 0) * (PRODUCT.quantity || 0);
  // cập nhật lại đơn hàng
  orders.value[order_index].total_price =
    $facade_order.calculateOrderTotalPrice(ORDER);
}

/** hàm xoá sản phẩm khỏi đơn hàng */
function deleteProduct(index: number, order_index: number) {
  // cập nhật lại tổng giá trị đơn hàng
  orders.value[order_index] = $facade_order.removeProductFromOrder(
    orders.value[order_index],
    index
  );
}
</script>
