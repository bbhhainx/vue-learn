import { FetchApiClient, IApiClient } from "./base";
import { IUserRepository, SecondVersionUserRepository } from "./user";

/** class factory dùng để tạo mới các đối tượng api */
class Factory {
  /** Hàm tạo mới đối tượng base api */
  static createBaseApi(type:string): IApiClient {
    /** Tạo mới đối tượng api base với domain user*/
    return new FetchApiClient(type);
  }

  /** Hàm tạo mới đối tượng service user */
  static createUserService(): IUserRepository {
    /** Tạo mới đối tượng api base với domain user*/
    const API = this.createBaseApi("user");
    /** Tạo mới đối tượng service user */
    return new SecondVersionUserRepository(API);
  }
}

export default Factory;
