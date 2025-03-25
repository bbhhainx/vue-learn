import { api_host } from "./host";

/** class cơ sở cho các class api cho từng domain */
export abstract class AbstractApiClient {
  /** domain */
  protected base_url: string;
  /** headers */
  protected headers: Record<string, string>;

  /** hàm khởi tạo */
  constructor(domain: string) {
    /** biến môi truoừng */
    const ENV = import.meta.env.MODE as keyof typeof api_host;
    this.base_url = api_host[ENV]?.[domain] || "";
    this.headers = { "Content-Type": "application/json" };
  }

  /** hàm request với phương thức post */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const RES = await fetch(`${this.base_url}/${endpoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });

    return RES.json();
  }
}