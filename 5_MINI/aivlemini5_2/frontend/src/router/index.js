import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

// 라우트 정의
const routes = [
  {
    path: '/login',
    component: () => import('../components/pages/LoginPage.vue'),
  },
  {
    path: '/signup',
    component: () => import('../components/pages/SignUpPage.vue'),
  },
  {
    path: '/',
    component: () => import('../components/pages/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/authors',
    component: () => import('../components/ui/AuthorGrid.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/scripts',
    component: () => import('../components/ui/ScriptGrid.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/publishings',
    component: () => import('../components/ui/PublishingGrid.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/userInfos',
    component: () => import('../components/ui/UserInfoGrid.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/books',
    component: () => import('../components/ui/BookGrid.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/points',
    component: () => import('../components/ui/PointGrid.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/readings',
    component: () => import('../components/ui/ReadingGrid.vue'),
    meta: { requiresAuth: true }
  },
  {
  path: '/books/:id',
  name: 'BookDetail',
  component: () => import('@/components/BookDetail.vue')
  }
]

// 라우터 생성
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 네비게이션 가드: 로그인 안 하면 /login, 로그인하면 /login, /signup 못 감
router.beforeEach((to, from, next) => {

  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return next('/login')
  }
  
  if ((to.path === '/login' || to.path === '/signup') && userStore.isLoggedIn) {
    // 이미 로그인 상태면 메인으로 보내기
    return next('/')
  }

  next()
})

export default router
