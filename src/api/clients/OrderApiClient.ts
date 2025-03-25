import { AbstractApiClient } from "../AbstractApiClient";

export class OrderApiClient extends AbstractApiClient {
  constructor() {
    super("order");
  }

  /** lấy danh sách đơn hàng */
  async list<T>(): Promise<T> {
    return this.post<T>("get_order", {});
  }
}