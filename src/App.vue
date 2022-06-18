<script setup lang="ts">
import Header from '~/components/Header.vue';
import Joker from '~/assets/svg/joker.svg';
</script>

<template>
  <main class="main">
    <Header />
    <Joker class="logo" />
    <router-view />
  </main>
</template>

<style lang="scss">
.main {
  padding: 30px 20px;
  @include flex($direction: column);
  color: var(--el-text-color-primary);

  .logo {
    margin-top: 30px;
    width: 80px;
    height: 80px;
    fill: var(--el-color-primary);
  }
}
</style>
