<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import Sun from '~/assets/svg/sun.svg';
import Moon from '~/assets/svg/moon.svg';
import Github from '~/assets/svg/github.svg';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const hanleNavigate = (url: string) => window.open(url);
</script>

<template>
  <div class="header">
    <Sun v-if="!isDark" class="header-icon" @click="toggleDark()" />
    <Moon v-else class="header-icon" @click="toggleDark()" />
    <Github class="header-icon" @click="hanleNavigate('https://github.com/RyanProMax/vue-vite-starter')" />
  </div>
</template>

<style lang="scss">
.header {
  @include flex();

  &-icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    fill: var(--el-text-color-secondary);

    &:hover {
      fill: var(--el-color-primary);
    }

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
}
</style>
