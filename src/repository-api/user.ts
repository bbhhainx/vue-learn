import { FetchApiClient, IApiClient } from "./base";

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
export interface IUserRepository {
  /** Lấy danh sách các user */
  getAll(): Promise<IUser[]>;
  /** Lấy thông tin user bằng id */
  getById(id: string): Promise<IUser | undefined>;
  /** Tạo mới user */
  create(item: IUser): Promise<void>;
  /** Chỉnh sửa thông tin user */
  update(item: IUser): Promise<void>;
  /** Xóa user */
  delete(id: string): Promise<void>;
}

/** Service chứa các api liên quan đến user 
 * @deprecated
*/
export class FirstVersionUserRepository implements IUserRepository {
  /** Hàm khởi tạo đối tượng api base */
  constructor(
    /** Đối tượng API chung */
    private API: IApiClient
  ) {}

  /** Lấy danh sách các user */
  async getAll(): Promise<IUser[]> {
    return await this.API.post("get_user", {});
  }

  /** Lấy thông tin user bằng id */
  async getById(id: string): Promise<IUser | undefined> {
    return await this.API.post("get_user", { id });
  }

  /** Tạo mới user */
  async create(item: IUser): Promise<void> {
    return await this.API.post("create_user", item);
  }

  /** Chỉnh sửa thông tin user */
  async update(item: IUser): Promise<void> {
    return await this.API.post("update_user", item);
  }

  /** Xóa user */
  async delete(id: string): Promise<void> {
    return await this.API.post("delete_user", { id });
  }
}


/** Service chứa các api liên quan đến user mới */
export class SecondVersionUserRepository implements IUserRepository {
  /** Hàm khởi tạo đối tượng api base */
  constructor(
    /** Đối tượng API chung */
    private readonly API: IApiClient
  ) {}

  /** Lấy danh sách các user */
  async getAll(): Promise<IUser[]> {
    return await this.API.post("get_user_v2", {});
  }

  /** Lấy thông tin user bằng id */
  async getById(id: string): Promise<IUser | undefined> {
    return await this.API.post("get_user_v2", { id });
  }

  /** Tạo mới user */
  async create(item: IUser): Promise<void> {
    return await this.API.post("create_user_v2", item);
  }

  /** Chỉnh sửa thông tin user */
  async update(item: IUser): Promise<void> {
    return await this.API.post("update_user_v2", item);
  }

  /** Xóa user */
  async delete(id: string): Promise<void> {
    return await this.API.post("delete_user_v2", { id });
  }
}


/** tạo ra user service để call các api */
// export const USER_SERVICE = new FirstVersionUserRepository(new FetchApiClient("user"));

/** tạo ra user service mới để call các api */
// export const USER_SERVICE = new SecondVersionUserRepository(new FetchApiClient("user"));
