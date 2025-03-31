import { ref, type Ref } from 'vue';

/** class call api có loading */
class ApiLoading {
  /** trạng thái loading */
  private is_loading: Ref<boolean>;

  constructor() {
    // khởi tạo loading
    this.is_loading = ref(false);
  }

  /** getter lấy trạng thái loading */
  get state() {
    return {
      is_loading: this.is_loading,
    };
  }

  /** bật loading */
  onLoading() {
    this.is_loading.value = true;
    return this;
  }

  /** call api */
  async callAPI<T>(asyncFn: () => Promise<T>): Promise<T> {
    try {
      return await asyncFn();
    } finally {
      // luôn tắt loading sau khi call api
      this.is_loading.value = false;
    }
  }
}

export const useApiLoading = () => {
  const apiLoading = new ApiLoading();
  return {
    ...apiLoading.state,
    apiLoading
  };
};