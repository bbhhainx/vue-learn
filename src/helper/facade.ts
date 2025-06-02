import { Ref } from "vue";

const FAKE_ORDERS: Order[] = [
  {
    id: 1,
    customer_id: 101,
    customer: {
      id: 101,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
    },
    products: [
      {
        id: 201,
        name: "Áo thun",
        price: 150000,
        description: "Áo thun cotton 100%",
        category: "Thời trang",
        quantity: 1,
        total_price: 150000,
      },
      {
        id: 202,
        name: "Quần jeans",
        price: 300000,
        description: "Quần jeans nam",
        category: "Thời trang",
        quantity: 2,
        total_price: 300000,
      },
    ],
    total_price: 750000,
    status: "pending",
  },
  {
    id: 2,
    customer_id: 102,
    customer: {
      id: 102,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0912345678",
    },
    products: [
      {
        id: 203,
        name: "Giày thể thao",
        price: 500000,
        description: "Giày thể thao nữ",
        category: "Thời trang",
        quantity: 2,
        total_price: 500000,
      },
    ],
    total_price: 1000000,
    status: "completed",
  },
];

// Mảng sản phẩm
const FAKE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Áo thun nam cổ tròn",
    price: 250000,
    description: "Áo thun nam chất liệu cotton 100%, thấm hút mồ hôi tốt.",
    category: "Thời trang nam",
  },
  {
    id: 2,
    name: "Giày sneaker nữ",
    price: 750000,
    description: "Giày sneaker nữ phong cách Hàn Quốc, đế cao su chống trượt.",
    category: "Giày dép",
  },
  {
    id: 3,
    name: "Tai nghe Bluetooth",
    price: 1200000,
    description: "Tai nghe Bluetooth không dây, thời lượng pin lên đến 8 giờ.",
    category: "Điện tử",
  },
  {
    id: 4,
    name: "Balo laptop 15 inch",
    price: 450000,
    description:
      "Balo chống sốc, phù hợp với laptop 15 inch, nhiều ngăn tiện lợi.",
    category: "Phụ kiện",
  },
  {
    id: 5,
    name: 'Sách "Đắc nhân tâm"',
    price: 98000,
    description: "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử.",
    category: "Sách",
  },
];

// Mảng khách hàng
const FAKE_CUSTOMER: Customer[] = [
  {
    id: 101,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
  },
  {
    id: 102,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
  },
  {
    id: 103,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
  },
  {
    id: 104,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
  },
  {
    id: 105,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
  },
];

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

/** Dữ liệu sản phẩm trong đơn hàng */
export interface OrderProduct extends Product {
  /** Số lượng sản phẩm trong đơn hàng */
  quantity?: number;
  /** Tổng giá trị của sản phẩm trong đơn hàng */
  total_price?: number;
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
  products?: OrderProduct[];
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
  updateOrder: (order: Order) => Order;
  /** Tính tổng giá trị của các sản phẩm trong đơn hàng */
  calculateTotalPrice: (products: Product[]) => number;
}

/** Facade cho các hoạt động liên quan đến đơn hàng */
interface OrderOperationFacade {
  /** Lấy các dữ liệu cần thiết cho đơn hàng */
  init: () => void;
  /** Chọn 1 đơn hàng */
  selectAnOrder: (order: Order) => Order;
  /** Lấy thông tin đơn hàng theo id */
  getOrderById: (id: number, orders?: Order[]) => Order;
  /** Thêm sản phẩm vào đơn hàng */
  addProductToOrder: (order: Order, product: Product) => Order;
  /** Xóa sản phẩm khỏi đơn hàng */
  removeProductFromOrder: (order: Order, productId: number) => Order;
  /** Tính toán lại giá trị của đơn hàng */
  calculateOrderTotalPrice: (order: Order) => number;
}

/** Các logic liên quan đến sản phẩm */
export class ProductServiceImpl implements ProductService {
  getProductById(id: number) {
    return FAKE_PRODUCTS.find((product) => product.id === id) || {};
  }
  getProducts() {
    return FAKE_PRODUCTS;
  }
}

/** Các logic liên quan đến khách hàng */
export class CustomerServiceImpl implements CustomerService {
  getCustomerById(id: number) {
    return FAKE_CUSTOMER.find((customer) => customer.id === id) || {};
  }
  getCustomers() {
    return FAKE_CUSTOMER;
  }
}

/** Các logic liên quan đến đơn hàng */
export class OrderServiceImpl implements OrderService {
  getOrderById(id: number) {
    return FAKE_ORDERS.find((order) => order.id === id) || {};
  }
  getOrders() {
    return FAKE_ORDERS;
  }
  createOrder(order: Order) {
    FAKE_ORDERS.push(order);
    return {
      order,
      id: FAKE_ORDERS.length,
      status: "pending",
    };
  }
  updateOrder(order: Order) {
    FAKE_ORDERS.map((o) => (o.id === order.id ? order : o));
    return order;
  }
  calculateTotalPrice(products: OrderProduct[]) {
    return products.reduce(
      (total, product) =>
        total + (product.price || 0) * (product.quantity || 0),
      0
    );
  }
}

/** Facade cho các hoạt động liên quan đến đơn hàng */
export class OrderOperationFacadeImpl implements OrderOperationFacade {
  constructor(
    private readonly productService: ProductService = new ProductServiceImpl(),
    private readonly customerService: CustomerService = new CustomerServiceImpl(),
    private readonly orderService: OrderService = new OrderServiceImpl()
  ) {}

  init() {
    /** danh sách đơn hàng */
    const ORDERS = this.orderService.getOrders();
    /** danh sách khách hàng */
    const CUSTOMERS = this.customerService.getCustomers();
    /** danh sách sản phẩm */
    const PRODUCTS = this.productService.getProducts();
    return {
      orders: ORDERS,
      customers: CUSTOMERS,
      products: PRODUCTS,
    };
  }

  selectAnOrder(order: Order) {
    // lấy thông tin khách hàng liên quan đến đơn hàng
    if (order.customer_id) {
      order.customer = this.customerService.getCustomerById(order.customer_id);
    }

    return order;
  }

  getOrderById(id: number, orders?: Order[]) {
    /** tìm trong mảng đang có sẵn trước */
    let order: Order | undefined = orders?.find((order) => order.id === id);

    /** nếu có thì trả về luôn */
    if (order) return order;

    // lấy thông tin đơn hàng theo id
    order = this.orderService.getOrderById(id);

    return this.selectAnOrder(order);
  }

  addProductToOrder(order: Order, product: Product) {
    /** danh sách đơn hàng hiện tại */
    let products = order.products || [];

    // thêm sản phẩm vào danh sách đơn hàng
    products.push({
      ...product,
      quantity: 1,
      total_price: product.price || 0,
    });

    /** giá trị đơn hàng sau khi thêm sản phẩm */
    const TOTAL_PRICE = this.orderService.calculateTotalPrice(products);

    // đơn hàng sau khi thêm sản phẩm
    const NEW_ORDER: Order = {
      ...order,
      products: products,
      total_price: TOTAL_PRICE,
    };

    // cập nhật đơn hàng
    return this.orderService.updateOrder(NEW_ORDER);
  }

  removeProductFromOrder(order: Order, index: number) {
    /** danh sách đơn hàng hiện tại */
    let products = order.products || [];

    // nếu không có sản phẩm nào trong đơn hàng, trả về đơn hàng hiện tại
    if (!products?.length) return order;

    // xóa sản phẩm có index tương ứng
    products.splice(index, 1);

    /** tổng tiền đơn hàng sau khi xóa sản phẩm */
    const TOTAL_PRICE = this.orderService.calculateTotalPrice(products);

    /** đơn hàng sau khi xóa sản phẩm */
    const NEW_ORDER: Order = {
      ...order,
      products: products,
      total_price: TOTAL_PRICE,
    };

    // cập nhật đơn hàng
    return this.orderService.updateOrder(NEW_ORDER);
  }

  calculateOrderTotalPrice(order: Order) {
    /** danh sách sản phẩm trong đơn hàng */
    const PRODUCTS = order.products || [];

    // tính tổng giá trị của đơn hàng
    return this.orderService.calculateTotalPrice(PRODUCTS);
  }
}
