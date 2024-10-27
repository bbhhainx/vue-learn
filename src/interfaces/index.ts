/** Dữ liệu tỉnh thành */
export interface ProvinceData {
    name?: string,
    slug?: string,
    type?: string,
    name_with_type?: string,
    code?: string
    is_hidden?: boolean
  }
  
  /** Dữ liệu quận huyện */
  export interface DistrictData {
    name?: string,
    type?: string,
    slug?: string,
    name_with_type?: string,
    path?: string,
    path_with_type?: string,
    code?: string,
    parent_code?: string
    is_hidden?: boolean
  }
  
  /** Dữ liệu xã phường */
  export interface WardData {
    name?: string,
    type?: string,
    slug?: string,
    name_with_type?: string,
    path?: string,
    path_with_type?: string,
    code?: string,
    parent_code?: string
    is_hidden?: boolean
  }
  
  export interface StreetData {
    code?: string
    name?: string
  }
  
  /** Các dạng type detect */
  export type DetectType = 'PROVINCE' | 'DISTRICT' | 'WARD' | 'STREET' | 'HOUSE_NUMBER'
  
  /** Dữ liệu chi tiết */
  export interface DetailData {
    id?: string
    code?: string
    type?: DetectType
    name?: string
  }
  
  /** Dữ liệu detect */
  export interface DetectData {
    formattedAddress: string
    components: DetailData[]
  }
  
  /** Danh sách đia chỉ detect */
  export interface Addresses {
    address_id: string;
    address_name: string
  }
  
  /** Dữ liệu chi tiết của địa chỉ */
  export interface LocationDetail {
    /** Số nhà */
    house_number?: DetailData
    /** Tên đường */
    street? : DetailData
    /** Xã phường */
    ward?: DetailData
    /** Quận huyện */
    district?: DetailData
    /** Tỉnh thành */
    province?: DetailData
  }
  /** Lưu dữ liệu contact */
export interface Contact {
    /** ID bản ghi dạng UUID */
    id?: string

    /** ID định danh khách hàng */
    identifier_id?: string

    /** id được hash ra từ avatar */
    hash_id?: string

    /** Tên gọi */
    first_name?: string

    /** Tên họ */
    last_name?: string

    /** Ảnh đại diện */
    avatar?: string

    /** Gợi ý số điện thoại */
    suggest_phone?: string

    /** Danh sách sdt */
    phones?: string[]

    /** Gợi ý email */
    suggest_email?: string

    /** Danh sách email */
    emails?: string[]

    /** Gợi ý psid */
    suggest_psid?: string

    /** Danh sách psid */
    psids?: string[]

    /** Gợi ý page_id */
    suggest_page_id?: string

    /** Danh sách page_id */
    page_ids?: string[]

    /** Danh sách label_id */
    label_ids?: string[]

    /** Danh sách địa chỉ */
    addresses?: any[]

    /** Giới tính */
    gender?: string

    /** Sinh nhật */
    birthday?: Date | string

    /** Tên công ty */
    company?: string

    /** ID doanh nghiệp */
    business_id?: string

    /** ID chi nhánh */
    branch_id?: string

    /** ID Phòng ban */
    department_id?: string

    /** ID đội nhóm (dữ liệu này lúc có lúc không) */
    team_id?: string

    /** ID nhân viên */
    employee_id?: string

    /** ID user */
    user_id?: string

    /** Danh sách SDT đã được xác thực */
    verified_phones?: string[]

    /** Danh sách email đã được xác thực */
    verified_emails?: string[]

    /** Danh sách nhân viên đã được assign vào */
    assigned_employees?: string[]

    /** Thời gian tạo record */
    createdAt?: Date

    /** Thời gian cập nhật record */
    updatedAt?: Date

    /** Thời gian tạo Note cuối cùng */
    last_time_note?: Date

    /** Thông tin người đọc note */
    unread?: {
        [user_id: string]: {
            is_read: boolean
            last_time_read: Date
        }
    }

    /** Tên gợi nhớ theo user */
    alias_names?: {
        [user_id: string]: {
            display_name: string
            search_name: string
        }
    }
}
  /** Dữ liệu sản phẩm trong đơn hàng */
export interface OrderProduct {
    /** Id sản phẩm */
    product_id?: string
    /** Tên sản phẩm */
    product_name?: string;
    /** Dạng sản phẩm */
    product_type?: string;
    /** Danh sách ảnh */
    images?: string[];
    /** ID biến thể */
    variant_id?: string;
    /** Giá bán */
    price?: number;
    /** Giá nhập */
    cost?: number;
    /** Số lượng nhập */
    quantity?: number;
    /** Số lượng tồn kho */
    inventory_quantity?: number;
    /** Tiền thuế vat */
    vat?: number;
    /** Chiết khấu */
    discount?: number;
    /** loại chiết khấu */
    discount_type?: 'money' | 'percent'
    /** Tổng tiền */
    total_price?: number;
    /** Trạng thái phân bổ sản phẩm */
    revenue_allocation?: boolean;
    /** Phí dịch vụ */
    service_fee?: number;
    /** cân nặng tính tiền */
    weight?: number;
}
/** Dữ liệu setting đơn hàng */
export interface Setting {

    /** ID bản ghi */
    id?: string;

    /** Dạng dữ liệu */
    type?: string;

    /** Key setting */
    key?: string;

    /** Giá trị setting */
    value?: SettingData;

    /** ID doanh nghiệp */
    business_id?: string;

    /** ID chi nhánh */
    branch_id?: string;

    /** ID Phòng ban */
    department_id?: string;

    /** ID đội nhóm (dữ liệu này lúc có lúc không) */
    team_id?: string;

    /** ID nhân viên */
    employee_id?: string;

    /** ID user */
    user_id?: string;

    /** Thời gian tạo record */
    createdAt?: Date;

    /** Thời gian cập nhật record */
    updatedAt?: Date;

}

/** Dữ liệu setting đơn hàng */
export interface SettingHistory {

    /** ID bản ghi */
    id?: string;

    /** Dạng dữ liệu */
    type?: string;

    /** Giá trị setting */
    value?: SettingData;

    old_value?: SettingData;

    /** ID doanh nghiệp */
    business_id?: string;

    /** ID chi nhánh */
    branch_id?: string;

    /** ID Phòng ban */
    department_id?: string;

    /** ID đội nhóm (dữ liệu này lúc có lúc không) */
    team_id?: string;

    /** ID nhân viên */
    employee_id?: string;

    /** ID user */
    user_id?: string;

    /** Thời gian tạo record */
    createdAt?: Date;

    /** Thời gian cập nhật record */
    updatedAt?: Date;

}

/** Dữ liệu thiết lập */
export interface SettingData {

    /** Gửi thông báo */
    send_telegram_notification?: boolean

    /** Trigger api facebook */
    trigger_capi?: boolean

    /** Danh sách trạng thái ofline */
    online_status?: ActionStep[][]

    /** Danh sách trạng thái offline */
    offline_status?: ActionStep[][]

    /** Chu kỳ kinh doanh của doanh nghiệp */
    business_period: {
        month: {
            start_date: number
            end_date: number
        }
        year: {
            start_time: Date
            end_time: Date
        }
    }

    /** Nhân viên online */
    online_staff: StaffInfo[]

    /** Nhân viên offline */
    offline_staff: StaffInfo[]

    /** Nhân viên bán hàng */
    saler: StaffInfo
};

/** Dữ liệu trong từng step */
export interface ActionStep {
    /** Tiêu đề của trạng thái */
    title: string;
    /** Hành động sẽ thực hiện */
    action: string;
    /** Màu nền nút bấm */
    bg_color: string;
    /** Màu chữ */
    text_color: string;
    /** Trạng thái active */
    is_active?: boolean
}

/** Dữ liệu nhân viên */
export interface StaffInfo {
    active: boolean
    /** Tiêu đề */
    title: string
    /** ID doanh nghiệp */
    business_id: string
    /** ID chi nhánh */
    branch_id: string
    /** ID phòng ban */
    department_id: string
    /** ID đội nhóm */
    team_id: string
    /** ID nhân viên */
    employee_id: string
    /** ID user */
    user_id: string
    /** Thu nhập p3 */
    salary_p3?: number
    /** Thu nhập p4 */
    salary_p4?: number
}
/** Dữ liệu đơn hàng */
export interface Order {

    /** ID bản ghi đơn hàng */
    id?: string

    /** Mã đơn hàng */
    order_id?: string;

    /** Sản phẩm */
    products?: OrderProduct[];

    /** Số lượng sản phẩm */
    quantity?: number;

    /** Giá bán */
    price?: number;

    /** Giảm giá */
    discount?: number;

    /** Tiền thuế phải nộp */
    vat?: number;

    total_price?: number

    /** Tổng tiền khách sẽ phải thanh toán */
    total_money?: number;

    /** Số tiền khách hàng đã đưa */
    money_paid?: number;

    /** Số tiền trả lại khách hàng */
    money_back?: number;

    /** Số tiền cần thu về */
    money_proceeds?: number;

    /** Số tiền khách hàng chưa thanh toán */
    money_unpaid?: number;

    /** Có tính vào công nợ không? */
    save_in_debt?: boolean;

    /** Phương thức thanh toán */
    payment_method?: 'CASH' | 'TRANSFER' | "MOMO" | ''

    /** Nhân viên thu tiền */
    cashier?: string;

    /** Ghi chú */
    note?: string;

    /** Trạng thái đơn hàng */
    status?: string;

    /** Mã khách hàng */
    contact_id?: string;

    /** Snap lại thông tin khách hàng */
    contact_info?: Contact;

    /** Chi phí khác */
    other_costs?: {
        name: string;
        value: number;
    }[];

    /** Tổng chi phí khác */
    total_other_costs?: number;

    /** Danh sách ảnh */
    images?: string[];

    /** Lịch sử hoạt động */
    action_logs?: {
        employee_id?: string
        status?: string | ActionStep[]
        time?: Date
    }[]

    /** Địa chỉ nhận hàng */
    address?: string

    /** Thông tin vị trí */
    locations?: {
        /** Tỉnh thành */
        province?: ProvinceData
        /** Quận huyện */
        district?: DistrictData
        /** Phường xã */
        ward?: WardData
        /** Dữ liệu tên đường */
        street?: StreetData
        /** Số nhà */
        house_number?: StreetData
    }

    /** Trạng thái freeship */
    is_freeship?: boolean

    /** Ghi chú nội bộ */
    internal_note?: string

    /** Ảnh nội bộ */
    internal_images?: string[]

    /** Thời gian tạo đơn tùy chọn */
    created_date?: Date

    /** Kết quả feedback */
    feedback_result?: string

    /** Thuộc tính tùy biến */
    custom_fields?: {
        /** Kênh bán hàng */
        sales_channel: string;
        /** Nguồn gốc đơn hàng */
        source: string;
        /** Id thợ chính làm sản phẩm */
        master: string;
        /** Id thợ phụ làm sản phẩm */
        assistant: string;
        /** Tổng giá các loại sản phẩm */
        products_price?: number;
    }

    /** Hành trình đơn hàng */
    order_journey?: ActionStep[][]

    /** Nhân viên bán hàng */
    saler?: StaffInfo

    /** Nhân viên tham gia */
    staffs?: StaffInfo[]

    /** Trạng thái xuất kho */
    is_inventory_export?: boolean

    /** ID doanh nghiệp */
    business_id?: string;

    /** ID chi nhánh */
    branch_id?: string;

    /** ID Phòng ban */
    department_id?: string;

    /** ID đội nhóm (dữ liệu này lúc có lúc không) */
    team_id?: string;

    /** ID nhân viên */
    employee_id?: string;

    /** ID user */
    user_id?: string;

    /** Thời gian tạo */
    createdAt?: Date

    /** Thời gian update */
    updatedAt?: Date
}