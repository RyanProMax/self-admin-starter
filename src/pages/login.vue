<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { get } from 'lodash-es';
import router from '~/router';
import { mockAccount } from '~/utils/mock';
import { PATH, STORAGE } from '~/utils/constant';

const loginForm = reactive<{
  account: string
  password: string
}>({
  account: 'admin',
  password: '123456'
});

const ruleFormRef = ref<FormInstance>();
const rules: Record<string, Rule[]> = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const submitLoading = ref<boolean>(false);

const fetchLogin = async() => {
  if (!mockAccount.some(x => x.account === loginForm.account && x.password === loginForm.password))
    throw new Error('用户名或密码错误');
  const state = useStorage(STORAGE.AUTH.name, STORAGE.AUTH.initialValue);
  const userInfo = useStorage(STORAGE.USER.name, STORAGE.USER.initialValue);
  state.value.token = '123456';
  userInfo.value = {
    name: loginForm.account,
    avatar: 'https://joeschmoe.io/api/v1/random'
  };
};

const handleLogin = async() => {
  try {
    if (!ruleFormRef.value)
      throw new Error('系统异常，请重试');

    await ruleFormRef.value.validate();
    submitLoading.value = true;
    await fetchLogin();
    router.push(PATH.HOME);
    submitLoading.value = false;
  }
  catch (e: any) {
    console.log(e);
    ElMessage({
      type: 'warning',
      message: e.message || get(e, 'errorFields[0].errors[0]', '系统异常，请重试')
    });
  }
};
</script>

<template>
  <div class="login">
    <main class="login-main">
      <h1 class="login-main__title">
        登陆
      </h1>
      <a-form ref="ruleFormRef" :model="loginForm" :rules="rules" class="login-main__form">
        <a-form-item name="account">
          <a-input v-model:value="loginForm.account" placeholder="账号" />
        </a-form-item>
        <a-form-item name="password">
          <a-input-password v-model:value="loginForm.password" type="password" placeholder="密码" />
        </a-form-item>
      </a-form>

      <a-button type="primary" class="login-main__button" @click="handleLogin()">
        登陆
      </a-button>
    </main>
  </div>
</template>

<style lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  @include flex();
  overflow: hidden;
  background-color: #293146;

  &-main {
    width: 360px;
    height: 320px;
    padding: 2rem;
    padding-bottom: 0;
    background-color: var(--el-color-white);
    border-radius: .375rem;
    box-shadow: var(--el-box-shadow);
    @include flex($direction: column, $justify: flex-start);

    &__title {
      font-size: 1.5rem;
      line-height: 1.75rem;
      font-weight: bold;
      color: var(--el-text-color-primary);
    }

    &__form {
      margin-top: 1.8rem;
      width: 100%;
    }

    &__button {
      width: 100%;
      margin-top: 1.6rem;
    }
  }
}
</style>
