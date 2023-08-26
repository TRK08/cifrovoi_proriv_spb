<template>
  <Statistics v-if="statistics" :data="statistics" />
  <vue-pdf-app v-if="pdf" :pdf="props.pdf" page-scale="page-fit" style="height: 80vh;"></vue-pdf-app>
</template>

<script setup lang="ts">
// https://www.npmjs.com/package/vue3-pdf-app
import "vue3-pdf-app/dist/icons/main.css";
import VuePdfApp from "vue3-pdf-app";
import Statistics from "@/components/stepper/Statistics.vue";
const props = defineProps<{
  pdf: string | undefined,
  statistics: Record<string, number> | null
}>()
</script>

<style scoped>

</style>
