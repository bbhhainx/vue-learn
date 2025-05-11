import { ApiClient, IApiClient } from "./base";

/** THông tin user */
export interface IUser {
  /** id của user */
  id?: string;
  /** tên của user */
  name?: string;
  /** email của user */
  email?: string;
  /** mật khẩu của user */
  password?: string;
}
/** Kiểu dữ liệu của user respository chứa các phương thức cần phải có */
export interface IUserRepository<T> {
  /** Lấy danh sách các user */
  getAll(): Promise<T[]>;
  /** Lấy thông tin user bằng id */
  getById(id: string): Promise<T | undefined>;
  /** Tạo mới user */
  create(item: T): Promise<void>;
  /** Chỉnh sửa thông tin user */
  update(item: T): Promise<void>;
  /** Xóa user */
  delete(id: string): Promise<void>;
}

/** Service chứa các api liên quan đến user */
class UserRepository implements IUserRepository<IUser> {
  /** Hàm khởi tạo đối tượng api base */
  constructor(private api: IApiClient) {}

  /** Lấy danh sách các user */
  async getAll(): Promise<IUser[]> {
    return await this.api.post("get_user", {});
  }

  /** Lấy thông tin user bằng id */
  async getById(id: string): Promise<IUser | undefined> {
    return await this.api.post("get_user", { id });
  }

  /** Tạo mới user */
  async create(item: IUser): Promise<void> {
    return await this.api.post("create_user", item);
  }

  /** Chỉnh sửa thông tin user */
  async update(item: IUser): Promise<void> {
    return await this.api.post("update_user", item);
  }

  /** Xóa user */
  async delete(id: string): Promise<void> {
    return await this.api.post("delete_user", { id });
  }
}

/** tạo ra user service để call các api */
export const USER_SERVICE = new UserRepository(new ApiClient("user"));
