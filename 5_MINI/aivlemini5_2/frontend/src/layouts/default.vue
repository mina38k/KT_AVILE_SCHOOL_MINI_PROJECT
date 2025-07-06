<script setup>
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
</script>

<template>
  <!-- 로그인 안 한 상태: 레이아웃 없이 RouterView만 -->
  <div v-if="!userStore.isLoggedIn">
    <RouterView />
  </div>
  <!-- 로그인 한 상태: 기존 레이아웃+RouterView -->
  <DefaultLayoutWithVerticalNav v-else>
    <RouterView />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
@use "@layouts/styles/default-layout";
</style>
