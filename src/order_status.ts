/** Danh sách status */
export const status_list: {
    [index: string]: { name: string; bg: string }
} = {
    CREATE_ORDER: { name: "Tạo đơn", bg: "bg-black" },
    CONFIRMED: { name: "Đã xác nhận", bg: "bg-blue-500" },
    PREPARING: { name: "Chuẩn bị làm", bg: "bg-blue-700" },
    DOING: { name: "Đang làm", bg: "bg-purple-500" },
    DONE: { name: "Đã xong", bg: "bg-emerald-500" },
    SHIPPING: { name: "Đang giao", bg: "bg-sky-500" },
    SHIPPED: { name: "Thành công", bg: "bg-green-500" },
    FEEDBACK: { name: "Đánh giá", bg: "bg-pink-500" },
};

/** Danh sách status khi đơn bị hủy */
export const cancel_status_list: {
    [index: string]: { name: string; bg: string }
} = {
    CREATE_ORDER: { name: "Tạo đơn", bg: "bg-black" },
    CONFIRMED: { name: "Đã xác nhận", bg: "bg-blue-500" },
    CANCELED: { name: "Hủy đơn", bg: "bg-red-500" },
    DOING: { name: "Đang làm", bg: "bg-purple-500" },
    DONE: { name: "Đã xong", bg: "bg-emerald-500" },
    SHIPPING: { name: "Đang giao", bg: "bg-sky-500" },
    SHIPPED: { name: "Thành công", bg: "bg-green-500" },
    FEEDBACK: { name: "Đánh giá", bg: "bg-pink-500" },
};

/** Danh sách status khi hoàn đơn */
export const refund_status_list: { 
    [index: string]: { name: string; bg: string } 
} = {
    CREATE_ORDER: { name: "Tạo đơn", bg: "bg-black" },
    CONFIRMED: { name: "Đã xác nhận", bg: "bg-blue-500" },
    PREPARING: { name: "Chuẩn bị làm", bg: "bg-blue-700" },
    DOING: { name: "Đang làm", bg: "bg-purple-500" },
    DONE: { name: "Đã xong", bg: "bg-emerald-500" },
    SHIPPING: { name: "Đang giao", bg: "bg-sky-500" },
    REFUND: { name: "Hoàn đơn", bg: "bg-red-700" },
    FEEDBACK: { name: "Đánh giá", bg: "bg-pink-500" },
};

/** Danh sách trạng thái offline */
export const offline_status_list: {
    [index: string]: { name: string; bg: string }
} = {
    CREATE_ORDER: { name: "Tạo đơn", bg: "bg-black" },
    SUCCESS: { name: "Thành công", bg: "bg-green-500" },
};