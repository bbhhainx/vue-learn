<template>
  <Cleave
    v-model="value"
    @change="updateValue"
    :options="{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      delimiter: '.',
      numeralDecimalMark: ',',
      prefix: '',
      noImmediatePrefix: true,
      rawValueTrimPrefix: true,
      numeralIntegerScale: 15,
      numeralDecimalScale: 0,
    }"
    class="border rounded p-2 w-full"
  />
</template>
<script setup lang="ts">
import Cleave from "vue-cleave-component";
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
const updateValue = () => {
  /** format lại về number */
  const NUM = Number(value.value);

  console.log(NUM);
  

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
