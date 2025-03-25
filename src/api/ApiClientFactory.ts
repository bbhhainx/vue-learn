import { OrderApiClient } from "./clients/OrderApiClient";
import { ProductApiClient } from "./clients/ProductApiClient";

/** Factory class để khởi tạo các api với các domain */
export class ApiClientFactory {
  static createClient(domain: string) {
    switch (domain) {
      case "order":
        return new OrderApiClient();
      case "product":
        return new ProductApiClient();
      default:
        throw new Error(`Unknown API domain: ${domain}`);
    }
  }
}