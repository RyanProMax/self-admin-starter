import { useLocalStorage } from '@vueuse/core';
import { createRouter, createWebHistory } from 'vue-router';
import { STORAGE } from '~/utils/constant';
import routes from '~pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async(to) => {
  const { token } = useLocalStorage(STORAGE.AUTH.name, STORAGE.AUTH.initialValue).value;
  if (!token && to.name !== 'login')
    return { name: 'login' };
});

export default router;
