<template>
  <div class="stepper">
    <n-card>
      <BaseStep v-if="stepName !== 'presentation'" :stepName="stepName" :title="titles[currentStep]" :data="data[stepName]" @updateCompanyData="data[stepName] = $event"/>
      <PdfStep v-else-if="stepName === 'presentation' && pdf" :pdf="pdf" />
      <template #action>
        <n-space justify="space-between">
          <n-button v-show="stepName !== 'product' && stepName !== 'presentation'" :disabled="isLoading" secondary round type="primary" @click="prevStep">
            <n-icon :component="ArrowBack" style="margin-right: 0.5rem;" ></n-icon>
            <span>Предыдущий шаг</span>
          </n-button>
          <n-button v-if="stepName !== 'economy' && stepName !== 'presentation'" secondary round type="primary" @click="nextStep" :disabled="!isValid">
            <span>Следующий шаг</span>
            <n-icon :component="ArrowForward" style="margin-left: 0.5rem;" ></n-icon>
          </n-button>
          <n-button v-else-if="stepName === 'economy'" primary round type="info" :disabled="isLoading || !isValid" :loading="isLoading" @click="loadPresentation">
            <span>Получить презентацию</span>
            <n-icon :component="ArrowForward" style="margin-left: 0.5rem;" ></n-icon>
          </n-button>
        </n-space>
        <n-space v-if="stepName === 'presentation'" justify="center">
          <n-button  :disabled="isLoading" secondary round type="primary" @click="toStart">
            <span>Начать сначала</span>
          </n-button>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useStepper} from "@/store/stepper";
import {ArrowForward, ArrowBack} from "@vicons/ionicons5";
import BaseStep from "@/components/stepper/BaseStep.vue";
import axios, { isAxiosError} from "axios";
import {computed, ref} from "vue";
import {useNotification} from "naive-ui";
import PdfStep from "@/components/stepper/PdfStep.vue";


const titles = ['Продукт', 'Компания', 'Экономическая модель']
const pdf = ref<string | null>(null)
const isLoading = ref(false)
const notification = useNotification()
const stepperStore = useStepper()
const {data, currentStep, stepName} = storeToRefs(useStepper())

const isValid = computed(() => {
  let isValid = true
  if (stepName.value === 'presentation') {
    return
  }
  for (let item of data.value[stepName.value]) {
    if (!item.value) {
      isValid = false
      break
    }
  }
  return isValid;
})
const nextStep = () => {
  currentStep.value++
}
const prevStep = () => {
  currentStep.value--
}

const toStart = () => {
  stepperStore.$reset()
}

const loadPresentation = async() => {
  isLoading.value = true
  const body = setRequestBody(data.value)
  try {
    const res = await axios.post('https://13-50-75-136.nip.io/api/v1/base64/generate', body)
    if (res?.data) {
      pdf.value = `data:application/pdf;base64,${res.data.pdf}`
      nextStep()
    }
  } catch (e: unknown) {
    notification.error({
      content: 'Ошибка загрузки презентации',
      duration: 3000,
    })
    if (isAxiosError(e)) {
      console.log(e.name, e.message, 'LOADING PDF ERROR')
    } else {
      console.log(e, 'LOADING PDF ERROR')
    }
  } finally {
    isLoading.value = false
  }
}


const setRequestBody = (dataFromStore: any[]) => {
  const reqObj = {} as { [key: string]: any }
  for (let [key, value] of Object.entries(dataFromStore)) {
    if (key === 'team') {
      reqObj[key] = value.map((item: {key: string, value: string}) => {
        return {
          name: item.key,
          role: item.value
        }
      })
    } else {
      reqObj[key] = value.reduce((acc: { [key: string]: any }, item: {key: string, value: string}) => {
        acc[item.key] = item.value
        return acc
      }, {})
    }
  }
  return reqObj

}

</script>

<style lang="scss">
</style>
