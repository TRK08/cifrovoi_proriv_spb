<template>
  <n-page-header class="header">
    <template #default>
      <div class="container">
        <n-space align="center" justify="space-between">
          <img class="header__logo" src="src/assets/img/ultra.png" alt="logo">
          <n-space align="center" class="header__user">
            <n-avatar
                class="header__user-avatar"
                round
                size="large"
               :style="{
                color: 'yellow',
                backgroundColor: 'red'
               }"
            >
              A
            </n-avatar>
            <span>Admin</span>
          </n-space>
        </n-space>
      </div>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.header {
  background-color: rgb(24, 24, 28);
  color: #fff;
  padding: 15px 0;
  border-bottom: solid 1px rgba(255, 255, 255, 0.09);
  &__logo {
    max-width: 100px;
    width: 100%;
  }
  &__user {
    height: 100%;
    padding: 5px 10px;
    overflow: hidden;
    &-avatar {
      display: block;
    }
  }
}
</style>
