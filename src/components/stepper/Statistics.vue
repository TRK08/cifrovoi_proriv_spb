<template>
  <div class="statistics">
    <h2>Статистика по продукту</h2>
    <n-space justify="space-between" :size="[5,5]" style="margin-bottom: 2rem">
      <n-card  v-for="item in statsArray" :key="item" size="small" hoverable>
        <n-statistic>
          <template #prefix>
            <h3>{{labels[item]}}</h3>
            <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="props.data[item]"
                :active="true"
                style="text-align: center; font-weight: 700"
            />
          </template>
        </n-statistic>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const labels = {
  average_price: 'Средняя цена',
  min_price: 'Минимальная цена',
  max_price: 'Максимальная цена',
  count: 'Количество'
} as Record<string, string>

interface Props {
  data: Record<string, number>
}
const props = defineProps<Props>()


const statsArray = computed(() => {
  if (props.data) {
    return Object.keys(props.data)
  }
})
</script>

<style lang="scss">
.statistics {
  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .n-statistic-value__prefix {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
