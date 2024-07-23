<template>
  <PopoverRoot :open="is_open">
    <PopoverTrigger as-child>
      <slot name="trigger"></slot>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        @pointer-down-outside="props.close()"
        :sideOffset="4"
      >
        <slot name="content"></slot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
<script lang="ts" setup>
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'radix-vue'

const is_open = defineModel({ default: false })

const props = defineProps<{
  close: () => void
}>()
</script>
