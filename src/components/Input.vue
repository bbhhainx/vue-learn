<template>
  <input
    type="number"
    v-model="value"
    @change="updateValue"
    :min="min"
    :max="max"
    inputmode="numeric"
    pattern="[0-9]*"
    class="border rounded p-2 w-full"
  />
</template>

<script setup lang="ts">

// * kiểu dữ liệu các prop của component này sẽ được truyền từ component cha
type Props = {
  /** giá trị tối đa */
  min?: number;
  /** giá trị tối thiểu */
  max?: number;
};

/** props */
const props = defineProps<Props>();

/** giá trị của input */
const value = defineModel({
  default: 0,
})

/** hàm cập nhật giá trị của input nếu input ra khỏi ngoài khoảng thiết lập */
const updateValue = (event: Event) => {
  // * lấy giá trị của input
  const INPUT = (event.target as HTMLInputElement).value;

  /** format lại về number */
  const NUM = Number(INPUT);

  // * nếu không phải là số thì trả về 0
  if (isNaN(NUM)) {
    value.value = props.min ?? 0;
    return;
  }

  // * nếu nhỏ hơn giá trị tối thiểu thì trả về giá trị tối thiểu
  if (props.min !== undefined && NUM < props.min) value.value = props.min;

  // * nếu lớn hơn giá trị tối đa thì trả về giá trị tối đa
  if (props.max !== undefined && NUM > props.max) value.value = props.max;
};
</script>

