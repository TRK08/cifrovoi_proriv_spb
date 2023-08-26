<template>
  <div class="base-step">
    <h2>{{ props.title }}</h2>
    <n-grid x-gap="12" y-gap="12" :cols="2" style="margin: 2rem 0" >
      <n-gi v-for="item in props.data" :key="item.label">
        <n-input v-model:value="item.value" type="text" :placeholder="item.label" />
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import type {IStepData} from "@/types/types";
interface Props {
  title: string
  data: IStepData[]
}

const props = defineProps<Props>()

</script>

<style lang="scss">
.base-step {
  min-height: 150px;
  h2 {
    font-size: 2rem;
    text-align: center;
  }
}
</style>
