<template>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import Factory from '../repository-api/factory';

onMounted(() => {
  /**  service chứa các api liên quan đến user */
  const USER_SERVICE = Factory.createUserService();

  /** call api lấy danh sách các user */
  USER_SERVICE.getAll()
  /** call api lấy user có id là 1 */
  USER_SERVICE.getById('1')
  /** call api tạo mới user */
  USER_SERVICE.create({
    name: 'Nguyen Van A',
    email: 'abc@gmail.com'
  })
  /** call api cập nhật user có id là 1 */
  USER_SERVICE.update({
    id: '1',
    name: 'Nguyen Van B',
    email: 'bcd@gmail.com'
  })
});
</script>
