<template>
  <div class="book-detail-wrap">
    <!-- 표지 이미지 영역 -->
    <div class="book-cover">
      <img :src="book.image || defaultCover" alt="book cover" />
    </div>
    <!-- 오른쪽 정보 영역 -->
    <div class="book-info-panel">
      <div class="book-title">{{ book.title }}</div>
      <div class="book-author">저자: {{ book.authorName }}</div>
      <div class="book-category">카테고리: {{ book.category }}</div>
      <div class="book-summary">{{ book.summaryContent }}</div>
      <div class="book-meta">
        <div class="price-row">
        <div>
            가격: <span class="highlight">{{ book.price?.toLocaleString() }}원</span>
        </div>
        <button class="book-action-btn" @click="showBuy = true">구매하기</button>
        </div>
        <div>조회수: <span class="highlight">{{ book.subscriptionCount }}</span></div>
      </div>
    </div>
    <BuyPlan
      v-if="showBuy"
      @buyPlan="onBuyPlan"
      @closeDialog="showBuy = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// 더미커버 (이미지 없을 때)
const defaultCover = 'https://dummyimage.com/400x600/ede9fe/6241d8&text=No+Image'

// 라우트 파라미터에서 id 가져오기
const route = useRoute()
const book = ref({})

onMounted(async () => {
  const id = route.params.id
  try {
    // 상세 정보 API 예시: /books/1
    const res = await axios.get(`/books/${id}`)
    book.value = res.data
  } catch (e) {
    // 에러 처리
    book.value = {}
  }
})
</script>

<style scoped>
.book-detail-wrap {
  display: flex;
  max-width: 1000px;
  margin: 56px auto 0 auto;
  gap: 60px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 32px rgba(44,44,44,0.08);
  padding: 38px 36px;
  align-items: flex-start;
}
.book-cover {
  width: 360px;
  min-width: 260px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.book-cover img {
  width: 100%;
  height: auto;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(98,65,216,0.13);
  background: #ede9fe;
  object-fit: cover;
}
.book-info-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;         /* 전체 항목 간 기본 간격 */
  padding-top: 6px;  /* 상단 여백 */
}

/* 제목과 저자/카테고리 간 분리 */
.book-title {
  font-size: 2.1rem;
  font-weight: 900;
  color: #251e4b;
  margin-bottom: 8px;
}
.book-author {
  font-size: 1.09rem;
  color: #8570d0;
  margin-bottom: 2px;
}
.book-category {
  font-size: 1.09rem;
  color: #8570d0;
  margin-bottom: 8px;
}

/* 요약 내용 위 아래 마진 */
.book-summary {
  font-size: 1.06rem;
  color: #3c384d;
  line-height: 1.6;
  margin: 10px 0 16px 0;
  white-space: pre-line;
}

/* 가격+구매 row 아래 마진 */
.price-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 16px 0 6px 0;
}

/* 조회수 아래 마진 */
.book-meta > div:nth-child(3) {
  margin-bottom: 8px;
}

/* PDF 버튼 위쪽 마진 */
.book-meta > div:last-child {
  margin-top: 12px;
}

.book-action-btn {
  color: #fff;
  background: #6241d8;
  padding: 8px 24px;
  border-radius: 7px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.16s;
  cursor: pointer;
  margin-left: 10px;
  display: inline-block;
  box-shadow: 0 1px 4px rgba(98,65,216,0.08);
}
.book-action-btn:hover {
  background: #4124a1;
}

@media (max-width: 900px) {
  .book-detail-wrap {
    flex-direction: column;
    gap: 36px;
    padding: 28px 10px;
    max-width: 98vw;
  }
  .book-cover {
    width: 100%;
    min-width: 0;
    justify-content: center;
  }
}
</style>