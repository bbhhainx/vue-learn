import { HOST } from "./host";

/** Kiểu dữ liệu của api base dùng chung */
export interface IApiClient {
  /** hàm request với phương thức post */
  post<T>(endpoint: string, data: any): Promise<T>;
}


/** class cơ sở cho các class api cho từng domain */
export class FetchApiClient implements IApiClient {
  /** domain */
  protected base_url: string;
  /** headers */
  protected headers: Record<string, string>;

  /** hàm khởi tạo */
  constructor(domain: string) {
    /** biến môi truoừng */
    const ENV = import.meta.env.MODE as keyof typeof HOST;

    /** domain của api */
    this.base_url = HOST[ENV]?.[domain] || "";

    /** headers mặc định của api */
    this.headers = { "Content-Type": "application/json" };
  }

  /** hàm request với phương thức post */
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      /** dữ liệu được trả về khi call api */
      const RES = await fetch(`${this.base_url}/${endpoint}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      // do call api bằng fetch nên cần parse dữ liệu trả về
      return RES.json();
    } catch (e) {
      throw e;
    }
  }
}