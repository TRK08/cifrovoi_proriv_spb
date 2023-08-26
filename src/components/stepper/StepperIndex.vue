<template>
  <div class="stepper">
    <n-card>
      <BaseStep v-if="currentStep <= data.length - 1" :title="titles[currentStep]" :data="data[currentStep]" />
      <PdfStep v-else :pdf="pdf" />
      <template #action>
        <n-space justify="space-between">
          <n-button v-show="currentStep > 0 && currentStep < data.length" :disabled="isLoading" secondary round type="primary" @click="prevStep">
            <n-icon :component="ArrowBack" style="margin-right: 0.5rem;" ></n-icon>
            <span>Предыдущий шаг</span>
          </n-button>
          <n-button v-if="currentStep < data.length - 1" secondary round type="primary" @click="nextStep" :disabled="!isValid">
            <span>Следующий шаг</span>
            <n-icon :component="ArrowForward" style="margin-left: 0.5rem;" ></n-icon>
          </n-button>
          <n-button v-else-if="currentStep === data.length - 1" primary round type="info" :disabled="isLoading || !isValid" :loading="isLoading" @click="loadPresentation">
            <span>Получить презентацию</span>
            <n-icon :component="ArrowForward" style="margin-left: 0.5rem;" ></n-icon>
          </n-button>
        </n-space>
        <n-space v-if="currentStep > data.length - 1" justify="center">
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
import {computed, onMounted, ref} from "vue";
import {useNotification} from "naive-ui";
import PdfStep from "@/components/stepper/PdfStep.vue";



const titles = ['Продукт', 'Компания', 'Экономическая модель']
const pdf = ref<string | null>(null)
const isLoading = ref(false)
const notification = useNotification()
const stepperStore = useStepper()
const {data, currentStep} = storeToRefs(useStepper())

const isValid = computed(() => {
  let isValid = true

  for (let item of data.value[currentStep.value]) {
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
  // currentStep.value = 0
}

const loadPresentation = async() => {
  setRequestBody()
  isLoading.value = true
  try {
    const res = await axios.post('https://13-50-75-136.nip.io/api/v1/base64/generate', {
      "product": {
        "idea": "asdasd",
        "market": "stridasdsang",
        "roadmap": "stdsadsaring"
      },
      "team": [
        {
          "name": "string",
          "role": "string"
        }
      ],
      "economy": {
        "revenue": 0,
        "number_of_clients": 0,
        "APRU": 0,
        "churn_rate": 0,
        "LT": 0,
        "LTV": 0
      }
    })
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


const setRequestBody = () => {
  console.log(data.value, 'DATA')

  // const objectKeys = ['product', 'team', 'economy']
  // const obj = {}
  // data.value.map((cat, idx) => {
  //
  // const test = cat.map(item => {
  //   obj.objectKeys[idx] = item
  // })
  // console.log(test)
  // })

}

</script>

<style lang="scss">
</style>
