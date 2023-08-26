<template>
  <div class="base-step">
    <h2>{{ props.title }}</h2>
    <template v-if="props.stepName === 'team'">
      <n-dynamic-input
          v-model:value="state"
          preset="pair"
          :min="1"
          :max="5"
          key-placeholder="Сотрудник"
          value-placeholder="Должность"
      />
    </template>
    <n-grid v-else x-gap="12" y-gap="12" :cols="2" style="margin: 2rem 0" >
      <n-gi v-for="item in props.data" :key="item.label">
        <n-space align="center" :wrap="false" size="small">
          <n-input-number v-if="stepName === 'economy'" v-model:value="item.value" type="text" :show-button="false" :placeholder="item.label" style="width: 100%" />
          <n-input v-else v-model:value="item.value" type="text" :placeholder="item.label" style="width: 100%" />
          <n-tooltip v-if="item.tooltip" trigger="hover" :style="{ maxWidth: '300px' }">
            <template #trigger>
              <n-icon :component="HelpCircleOutline" style="cursor: pointer"></n-icon>
            </template>
            {{ item.tooltip }}
          </n-tooltip>
        </n-space>
      </n-gi>
    </n-grid>

  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {HelpCircleOutline} from "@vicons/ionicons5";

interface Props {
  title: string
  data: any[]
  stepName: string
}

const props = defineProps<Props>()
const emit = defineEmits(['updateCompanyData'])
const state = ref([
  {
    key: '',
    value: ''
  }
])

watch(() => state.value, (val) => {
  emit('updateCompanyData', val)
})

</script>

<style lang="scss">
.base-step {
  min-height: 150px;
  h2 {
    font-size: 2rem;
    text-align: center;
  }
  .n-space {
    div:first-of-type {
      width: 100%;
    }
  }
}

</style>
