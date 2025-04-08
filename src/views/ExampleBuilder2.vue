<template>

</template>
<script setup lang="ts">
/** kiểu của builder */
interface OrderBuilder {
  format: () => OrderBuilder;
  validate: () => OrderBuilder;
  setProduct: (product: string) => OrderBuilder;
  setPrice: (price: number) => OrderBuilder;
  setCustomer: (customer: string) => OrderBuilder;
  setAddress: (address: string) => OrderBuilder;
  build: () => Order;
}

/** lớp đơn hàng */
class Order {
  constructor(
    public product?: string,
    public price?: number,
    public customer?: string,
    public address?: string
  ) {}

  submit() {
    console.log(this.product, this.price, this.customer, this.address);
  }
}

/** lớp xây dựng đơn hàng */
class OrderBuilderImpl implements OrderBuilder {
  private order: Order;

  constructor() {
    this.order = new Order();
  }

  /** định dạng */
  format() {
    this.order.price = Number(this.order.price || 0);
    return this;
  }

  /** xác thực */
  validate() {
    // kiểm tra sản phẩm
    if (!this.order.product) {
      throw new Error("Product is required");
    }

    // kiểm tra khách hàng
    if (!this.order.customer) {
      throw new Error("Customer is required");
    }
    return this;
  }

  /** khởi tạo sản phẩm */
  setProduct(product: string) {
    this.order.product = product;
    return this;
  }

  /** khởi tạo giá */
  setPrice(price: number) {
    this.order.price = price;
    return this;
  }

  /** khởi tạo khách hàng */
  setCustomer(customer: string) {
    this.order.customer = customer;
    return this;
  }

  /** khởi tạo địa chỉ */
  setAddress(address: string) {
    this.order.address = address;
    return this;
  }

  /** gửi đơn hàng */
  build() {
    return this.order;
  }
}

/** lớp giám đốc */
class OrderDirector {
  private builder: OrderBuilder;

  constructor(builder: OrderBuilder) {
    this.builder = builder;
  }

  /** cập nhật khách hàng */
  updateCustomer(customer: string) {
    return this.builder.setCustomer(customer).build();
  }

  /** cập nhật địa chỉ */
  updateAddress(address: string) {
    return this.builder.setAddress(address).build();
  }

  /** cập nhật sản phẩm */
  updateProduct(product: string, price: number) {
    return this.builder.setProduct(product).setPrice(price).format().validate().build();
  }
}

/** khởi tạo đối tượng xây dựng đơn hàng */
const builder = new OrderBuilderImpl();
/** khởi tạo giám đốc */
const director = new OrderDirector(builder);

/** cập nhật khách hàng */
const form1 = director.updateCustomer("Nguyen Van A");
form1.submit()

/** cập nhật địa chỉ */
const form2 = director.updateAddress("Ha Noi");
form2.submit()

/** cập nhật sản phẩm */
const form3 = director.updateProduct("Iphone", 1000);
form3.submit()
</script>