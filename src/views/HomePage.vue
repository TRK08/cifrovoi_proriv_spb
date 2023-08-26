<template>
  <Header />
  <main>
    <div class="container">
      <StepperIndex />
    </div>
  </main>
</template>

<script setup lang="ts">

import Header from "@/components/UI/Header.vue";
import StepperIndex from "@/components/stepper/StepperIndex.vue";
</script>


<style lang="scss">
main {
  padding: 4rem 0 2rem;
  width: 100%;
  min-height: 100vh;
  color: rgba(255, 255, 255, 0.82);
  background-color: rgb(16, 16, 20);
}
</style>
