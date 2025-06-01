import { Ref } from "vue";

const FAKE_ORDERS = [
  {
    id: 1,
    customer_id: 101,
    customer: {
      id: 101,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567"
    },
    products: [
      {
        id: 201,
        name: "Áo thun",
        price: 150000,
        description: "Áo thun cotton 100%",
        category: "Thời trang"
      },
      {
        id: 202,
        name: "Quần jeans",
        price: 300000,
        description: "Quần jeans nam",
        category: "Thời trang"
      }
    ],
    total_price: 450000,
    status: "pending"
  },
  {
    id: 2,
    customer_id: 102,
    customer: {
      id: 102,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0912345678"
    },
    products: [
      {
        id: 203,
        name: "Giày thể thao",
        price: 500000,
        description: "Giày thể thao nữ",
        category: "Thời trang"
      }
    ],
    total_price: 500000,
    status: "completed"
  }
]

/** Dữ liệu của sản phẩm */
export interface Product {
  /** Mã định danh duy nhất của sản phẩm */
  id?: number;
  /** Tên của sản phẩm */
  name?: string;
  /** Giá bán của sản phẩm */
  price?: number;
  /** Mô tả chi tiết về sản phẩm */
  description?: string;
  /** Danh mục mà sản phẩm thuộc về */
  category?: string;
}

/** Dữ liệu của khách hàng */
export interface Customer {
  /** Mã định danh duy nhất của khách hàng */
  id?: number;
  /** Họ và tên đầy đủ của khách hàng */
  name?: string;
  /** Địa chỉ email của khách hàng */
  email?: string;
  /** Số điện thoại liên hệ của khách hàng */
  phone?: string;
}

/** Dữ liệu của đơn hàng */
export interface Order {
  /** Mã định danh duy nhất của đơn hàng */
  id?: number;
  /** Mã định danh của khách hàng liên quan đến đơn hàng */
  customer_id?: number;
  /** Thông tin chi tiết của khách hàng */
  customer?: Customer;
  /** Danh sách các sản phẩm trong đơn hàng */
  products?: Product[];
  /** Tổng giá trị của đơn hàng */
  total_price?: number;
  /** Trạng thái hiện tại của đơn hàng (ví dụ: 'pending', 'completed', 'cancelled') */
  status?: string;
}

/** Các dịch vụ liên quan đến sản phẩm */
interface ProductService {
  /** Lấy thông tin sản phẩm theo id */
  getProductById: (id: number) => Product;
  /** Lấy danh sách sản phẩm */
  getProducts: () => Product[];
}

/** Các dịch vụ liên quan đến khách hàng */
interface CustomerService {
  /** Lấy thông tin khách hàng theo id */
  getCustomerById: (id: number) => Customer;
  /** Lấy danh sách khách hàng */
  getCustomers: () => Customer[];
}

/** Các dịch vụ liên quan đến đơn hàng */
interface OrderService {
  /** Lấy thông tin đơn hàng theo id */
  getOrderById: (id: number) => Order;
  /** Lấy danh sách đơn hàng */
  getOrders: () => Order[];
  /** Tạo một đơn hàng mới */
  createOrder: (order: Order) => Order;
  /** Cập nhật thông tin đơn hàng */
  updateOrder: (id: number, order: Order) => Order;
  /** Tính tổng giá trị của các sản phẩm trong đơn hàng */
  calculateTotalPrice: (products: Product[]) => number;
}

/** Facade cho các hoạt động liên quan đến đơn hàng */
interface OrderOperationFacade {
  /** Lấy các dữ liệu cần thiết cho đơn hàng */
  init: () => void;
  /** Chọn một đơn hàng */
  selectAnOrder: (order: Order) => void;
  /** Thêm sản phẩm vào đơn hàng */
  addProductToOrder: (orderId: number, product: Product) => Order;
  /** Xóa sản phẩm khỏi đơn hàng */
  removeProductFromOrder: (orderId: number, productId: number) => Order;
}

/** Các logic liên quan đến sản phẩm */
export class ProductServiceImpl implements ProductService {
  getProductById(id: number) {
    return {};
  }
  getProducts() {
    return [];
  }
}

/** Các logic liên quan đến khách hàng */
export class CustomerServiceImpl implements CustomerService {
  getCustomerById(id: number) {
    return {};
  }
  getCustomers() {
    return [];
  }
}

/** Các logic liên quan đến đơn hàng */
export class OrderServiceImpl implements OrderService {
  getOrderById(id: number) {
    return {};
  }
  getOrders() {
    return FAKE_ORDERS;
  }
  createOrder(order: Order) {
    return order;
  }
  updateOrder(id: number, order: Order) {
    return order;
  }

  calculateTotalPrice(products: Product[]) {
    return products.reduce((total, product) => total + (product.price || 0), 0);
  }
}

/** Facade cho các hoạt động liên quan đến đơn hàng */
export class OrderOperationFacadeImpl implements OrderOperationFacade {
  constructor(
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
    private readonly orderService: OrderService,
    private order: Ref<Order>,
    private orders: Ref<Order[]>,
    private customers: Ref<Customer[]>,
    private products: Ref<Product[]>
  ) {
    this.productService = productService;
    this.customerService = customerService;
    this.orderService = orderService;
    this.order.value = order.value;
    this.customers.value = customers.value;
    this.products.value = products.value;
  }

  init() {
    this.orders.value = this.orderService.getOrders();
    this.customers.value = this.customerService.getCustomers();
    this.products.value = this.productService.getProducts();
  }

  selectAnOrder(order: Order) {
    // lưu lại giá trị của đơn hàng đã chọn
    this.order.value = order

    // nếu có id khách hàng, lấy thông tin khách hàng
    if (this.order.value.customer_id) {
      this.order.value.customer = this.customerService.getCustomerById(
        this.order.value.customer_id
      );
    }
  }

  addProductToOrder(order_id: number, product: Product) {
    // nếu chưa có danh sách sản phẩm, khởi tạo mảng
    if (!this.order.value.products?.length) {
      this.order.value.products = [];
    }
    // thêm sản phẩm vào đơn hàng
    this.order.value.products.push(product);
    
    // tính lại tổng giá trị của đơn hàng
    this.order.value.total_price = this.orderService.calculateTotalPrice(
      this.order.value.products
    );

    // cập nhật đơn hàng
    return this.orderService.updateOrder(order_id, this.order.value);
  }

  removeProductFromOrder(order_id: number, product_id: number) {
    // nếu không có sản phẩm nào trong đơn hàng, trả về đơn hàng hiện tại
    if (!this.order.value.products?.length) return this.order.value;

    // lọc bỏ sản phẩm có id tương ứng
    this.order.value.products = this.order.value.products.filter((p) => p.id !== product_id);

    // tính lại tổng giá trị của đơn hàng
    this.order.value.total_price = this.orderService.calculateTotalPrice(
      this.order.value.products
    );

    // cập nhật đơn hàng
    return this.orderService.updateOrder(order_id, this.order.value);
  }
}


