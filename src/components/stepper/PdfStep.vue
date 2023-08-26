<template>
  <vue-pdf-app style="height: 100vh;" :pdf="props.pdf" page-scale="page-fit"></vue-pdf-app>
</template>

<script setup lang="ts">
// https://www.npmjs.com/package/vue3-pdf-app
import "vue3-pdf-app/dist/icons/main.css";
import VuePdfApp from "vue3-pdf-app";
const props = defineProps<{pdf: string}>()
</script>

<style scoped>

</style>
