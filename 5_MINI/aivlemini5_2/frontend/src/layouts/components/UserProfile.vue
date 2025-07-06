<script setup>
const avatarBadgeProps = {
  dot: true,
  location: 'bottom right',
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}

const userName = "USER"
const point = 1234           // 포인트
const subscribeStart = "2024-06-10"   // 구독 시작일 (YYYY-MM-DD)
</script>

<template>
  <VBadge v-bind="avatarBadgeProps">
    <VAvatar
      style="cursor: pointer;"
      color="primary"
      variant="tonal"
    >
      <VIcon icon="mdi-account" />

      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Name -->
          <VListItem>
            <VListItemTitle class="font-weight-semibold">
              {{ userName }}
            </VListItemTitle>
          </VListItem>

          <!-- 👉 Point 정보 -->
          <VListItem>
            <VListItemTitle>
              포인트: <b>{{ point }}</b>
            </VListItemTitle>
          </VListItem>

          <!-- 👉 구독 시작일 정보 -->
          <VListItem>
            <VListItemTitle>
              구독 시작일: <b>{{ subscribeStart }}</b>
            </VListItemTitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon class="me-2" icon="mdi-logout-variant" size="22" />
            </template>
            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template>
