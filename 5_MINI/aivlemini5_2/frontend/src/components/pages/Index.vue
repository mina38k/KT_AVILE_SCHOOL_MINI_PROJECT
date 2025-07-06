<template>
  <div class="page-wrap">
    <!-- 상단 네비게이션바 -->
    <header class="main-header">
      <div class="logo">출간 책</div>
      <nav class="nav-buttons">
        <button @click="goReadings">열람내역</button>
        <AuthorGrid ref="authorGridRef" style="display:none" />
        <button @click="openAuthorDialog">작가등록</button>
        <button @click="goPoints">포인트</button>
        <button @click="logout" class="logout-btn">로그아웃</button>
      </nav>
    </header>

    <!-- 베스트셀러 목록 -->
    <main class="main-section">
      <h2 class="section-title">🔥 베스트셀러</h2>
      <div class="book-grid" v-if="bestSellers.length > 0">
        <div v-for="book in bestSellers" :key="book.id" class="book-card">
          <img class="book-thumb" :src="book.image || defaultCover" alt="book cover" loading="lazy" />
          <div class="book-info">
            <div class="book-title">{{ book.title }}</div>
            <div class="book-author">{{ book.authorName }}</div>
            <div class="book-count">조회수: {{ book.subscriptionCount ?? 0 }}</div>
          </div>
        </div>
      </div>
      <div v-else class="empty-message">베스트셀러 도서가 없습니다.</div>

    <!-- 메인(카드 그리드) -->
      <h2 class="section-title">📚 신규도서목록</h2>
      <div class="book-grid">
        <div
          v-for="book in books"
          :key="book.id"
          class="book-card"
        >
        <router-link :to="`/books/${book.id}`" class="thumb-link">
           <img
            class="book-thumb"
            :src="book.image || defaultCover"
            alt="book cover"
            loading="lazy"
          />
          </router-link>
          <div class="book-info">
            <div class="book-title">{{ book.title }}</div>
            <div class="book-author">{{ book.authorName }}</div>
            <div class="book-count">조회수: {{ book.subscriptionCount ?? 0 }}</div>
          </div>
        </div>
        <div v-if="books.length === 0" class="empty-message">
          도서 정보를 불러오는 중입니다...
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import AuthorGrid from '../ui/AuthorGrid.vue'
const authorGridRef = ref(null)

const books = ref([])
const router = useRouter()
const userStore = useUserStore()

const bestSellers = computed(() => books.value.filter(book => book.isBestSeller))


onMounted(async () => {
  try {
    const res = await axios.get('/books')
    books.value = res.data._embedded?.books || res.data // 구조에 따라 맞춤
  } catch (e) {
    books.value = []
  }
})

function logout() {
  userStore.logout()
  router.push('/login')
}
function goReadings() {
  router.push('/readings')
}
function goPoints() {
  router.push('/points')
}
function openAuthorDialog() {
  if (authorGridRef.value) authorGridRef.value.showDialog()
}
</script>

<style scoped>
.page-wrap {
  min-height: 100vh;
  background: #f8fafc;
}

.main-header {
  width: 100%;
  background: #f5f3ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 36px 16px 36px;
  border-bottom: 1px solid #ebe8fd;
  box-sizing: border-box;
}
.logo {
  font-size: 2rem;
  font-weight: 900;
  color: #6241d8;
  letter-spacing: -1px;
  font-family: 'Montserrat', sans-serif;
}
.nav-buttons button {
  background: #fff;
  color: #6241d8;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  padding: 8px 18px;
  margin-left: 12px;
  cursor: pointer;
  transition: background 0.16s;
  box-shadow: 0 1px 3px rgba(98,65,216,0.03);
}
.nav-buttons .logout-btn {
  color: #fff;
  background: #6241d8;
  font-weight: 700;
}
.nav-buttons .logout-btn:hover {
  background: #4124a1;
}
.nav-buttons button:hover {
  background: #f3e8ff;
}

.main-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 24px 0 24px;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #6241d8;
  letter-spacing: -1px;
}
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 30px;
  margin-bottom: 48px;
}
.book-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(44,44,44,0.07);
  padding: 24px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.14s;
  border: 1px solid #ede9fe;
}
.book-card:hover {
  box-shadow: 0 4px 20px rgba(98,65,216,0.09);
}
.thumb-link {
  display: block;
}
.book-thumb {
  width: 100%;
  height: 140px;
  object-fit: cover;
  background: linear-gradient(92deg, #ede9fe 40%, #fff 100%);
  border-radius: 10px;
  margin-bottom: 18px;
  cursor: pointer;
  display: block;
}
.book-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.book-title {
  font-size: 18px;
  font-weight: 700;
  color: #25213b;
  margin-bottom: 4px;
}
.book-author {
  font-size: 15px;
  color: #8570d0;
  margin-bottom: 8px;
}
.book-etc {
  display: flex;
  gap: 14px;
  font-size: 13px;
  color: #b9b1da;
}
.empty-message {
  grid-column: 1/-1;
  text-align: center;
  color: #a1a1aa;
  padding: 48px 0;
  font-size: 19px;
}
</style>
