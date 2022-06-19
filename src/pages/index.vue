<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import {
  InfoCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { useStorage } from '@vueuse/core';
import Logo from '~/assets/svg/logo.svg';
import router from '~/router';
import { PATH, STORAGE } from '~/utils/constant';
import { useLogout } from '~/utils';

const route = useRoute();
const isCollapse = ref<boolean>(false);
const toggleCollapse = () => isCollapse.value = !isCollapse.value;

const menuList = [
  { key: '1', title: '用户列表', icon: UserOutlined, path: PATH.USER },
  { key: '2', title: '关于', icon: InfoCircleOutlined, path: PATH.ABOUT }
];
const currPage = computed(() => menuList.find(x => x.path === route.path));
const selectedKeys = ref<string[]>([currPage.value!.key]);

const userInfo = useStorage(STORAGE.USER.name, STORAGE.USER.initialValue);

const handleExit = () => {
  useLogout();
};

watchEffect(() => {
  selectedKeys.value = [currPage.value!.key];
});
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="isCollapse" :trigger="null" collapsible>
      <div class="layout-logo" @click="router.push(PATH.HOME)">
        <Logo class="layout-logo__icon" />
        <h1 v-if="!isCollapse" class="layout-logo__text">
          后台管理系统
        </h1>
      </div>
      <a-menu :key="route.path" v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" class="layout-sidebar">
        <a-menu-item v-for="item in menuList" :key="item.key" @click="router.push(item.path)">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <div class="layout-header__left">
          <component
            :is="isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined" class="layout-header__icon"
            @click="toggleCollapse"
          />
        </div>
        <div class="layout-header__right">
          <a-dropdown>
            <div class="layout-header__user" @click.prevent>
              <a-avatar :src="userInfo.avatar" class="layout-header__avatar">
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
              <span class="layout-header__username">{{ userInfo.name }}</span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="handleExit">
                  <logout-outlined />
                  退出系统
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <transition name="fade-slide" mode="out-in">
        <a-layout-content :key="route.path" class="layout-main">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </a-layout-content>
      </transition>
    </a-layout>
  </a-layout>
</template>

<style lang="scss">
.layout {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  &-logo {
    height: 64px;
    @include flex();
    cursor: pointer;

    &__icon {
      width: 28px;
      height: 28px;
    }

    &__text {
      font-size: 1rem;
      color: #fff;
      font-weight: bold;
      margin-left: 12px;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  &-header {
    background: #fff;
    padding: 0;
    @include flex($justify: space-between);

    &__left,
    &__right {
      @include flex();
    }

    &__user {
      margin-right: 16px;
      padding: 0 12px;
      cursor: pointer;

      &:hover {
        background-color: var(--el-bg-color-page);
        transition: background 0.3s;
      }
    }

    &__avatar {
      background-color: var(--el-color-info-light-5);
    }

    &__username {
      margin-left: .75rem;
    }

    &__icon {
      font-size: 18px;
      line-height: 64px;
      padding: 0 12px;
      cursor: pointer;

      &:hover {
        background-color: var(--el-bg-color-page);
        transition: background 0.3s;
      }
    }
  }

  &-sidebar {
    .ant-menu-item {
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
    }

    .ant-menu-item-selected {
      background-color: #0960bd !important;
    }
  }

  &-main {
    margin: 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
    border-radius: .25rem;
  }
}
</style>
