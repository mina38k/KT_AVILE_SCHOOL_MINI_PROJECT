<script setup>
import Default from '@/layouts/default.vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
</script>

<template>
  <VApp>
    <div v-if="!userStore.isLoggedIn">
      <router-view /> <!-- 로그인/회원가입만 보임 -->
    </div>
    <div v-else>
      <Default /> <!-- 네비게이션 등, 나머지 페이지 보임 -->
    </div>
  </VApp>
</template>
