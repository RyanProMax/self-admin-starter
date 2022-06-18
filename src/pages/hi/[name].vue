<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { name } = route.params;
</script>

<template>
  <p class="hi-title">
    Welcome
  </p>
  <p class="hi-sub-title">
    {{ name }}
  </p>

  <el-button class="hi-button" type="primary" @click="router.back()">
    back
  </el-button>
</template>

<style lang="scss">
.hi {
  &-title {
    margin-top: 25px;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  &-sub-title {
    margin-top: 10px;
  }

  &-button {
    margin-top: 20px;
  }
}
</style>
