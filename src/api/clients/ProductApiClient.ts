import { AbstractApiClient } from "../AbstractApiClient";

export class ProductApiClient extends AbstractApiClient {
  constructor() {
    super("product");
  }

  /** lấy danh sách sản phẩm */
  async list<T>(): Promise<T> {
    return this.post<T>("get_product", {});
  }
}