<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');

const handleNavigate = () => name.value.trim() && router.push(`/hi/${name.value}`);
</script>

<template>
  <p class="home-title" w:text="xl">
    Vue Vite Starter
  </p>
  <p class="home-sub-title" w:font="italic">
    A Vue 3.x + Vite 2.x + Element-Plus + TypeScript + Sass template starter 🚀
  </p>
  <p class="home-sub-title" w:font="italic">
    一个极简的快速启动模板 💪
  </p>

  <el-input v-model="name" placeholder="Please input your name" class="home-input" @keyup.enter="handleNavigate()" />

  <el-button type="primary" class="home-button" @click="handleNavigate()">
    Jump
  </el-button>
</template>

<style lang="scss">
.home {
  &-title {
    margin-top: 25px;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  &-sub-title {
    margin-top: 10px;
    font-size: 1rem;
    line-height: 1.5rem;
    color: var(--el-text-color-secondary);
    font-style: italic;
  }

  &-input {
    margin-top: 20px;
    width: 250px;
  }

  &-button {
    margin-top: 20px;
  }
}
</style>
