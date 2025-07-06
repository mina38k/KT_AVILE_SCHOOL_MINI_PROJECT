<template>
  <div class="login-container">
    <form class="login-box" @submit.prevent="login">
      <h2>Login</h2>
      <input
        v-model="loginId"
        type="text"
        placeholder="아이디"
        class="login-input"
        autocomplete="username"
        required
      />
      <input
        v-model="loginPw"
        type="password"
        placeholder="비밀번호"
        class="login-input"
        autocomplete="current-password"
        required
      />
      <div class="remember-row">
        <input
          id="remember"
          type="checkbox"
          v-model="rememberId"
          class="login-checkbox"
        />
        <label for="remember" class="remember-label">아이디 저장하기</label>
      </div>
      <button type="submit" class="login-btn">Login</button>
      <!-- 회원가입 링크 -->
      <div class="signup-link-row">
        <span>아직 회원이 아니신가요?</span>
        <router-link to="/signup" class="signup-link">회원가입</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'


const loginId = ref('')
const loginPw = ref('')
const rememberId = ref(false)
const router = useRouter()
const userStore = useUserStore()

// 아이디 저장 기능
onMounted(() => {
  const saved = localStorage.getItem('savedLoginId')
  if (saved) {
    loginId.value = saved
    rememberId.value = true
  }
})

async function login() {
  if (loginId.value && loginPw.value) {
    try {
      // 모든 유저 정보 조회 (GET /userInfos)
      const res = await axios.get('/userInfos')
      const userList = res.data._embedded?.userInfos || []

      // loginId, loginPw가 모두 일치하는 유저 찾기
      const matchedUser = userList.find(
        u => u.loginId === loginId.value && u.loginPw === loginPw.value
      )

      if (matchedUser) {
        userStore.login({ loginId: matchedUser.loginId, userName: matchedUser.userName, id: matchedUser.id })
        if (rememberId.value) {
          localStorage.setItem('savedLoginId', loginId.value)
        } else {
          localStorage.removeItem('savedLoginId')
        }
        alert('로그인 성공!')
        router.push('/')
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      }
    } catch (e) {
      alert('로그인 오류: ' + (e.response?.data?.message || e.message))
    }
  } else {
    alert('아이디와 비밀번호를 입력하세요.')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafd;
}

.login-box {
  background: #fff;
  border-radius: 8px;
  padding: 32px 32px 24px 32px;
  box-shadow: 0 2px 24px rgba(44, 44, 44, 0.08);
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-sizing: border-box;
}

.login-box h2 {
  color: #7c3aed;
  font-size: 26px;
  margin-bottom: 8px;
  font-weight: 700;
}

.login-input {
  background: #f8f8fa;
  border: none;
  outline: none;
  padding: 14px 12px;
  border-radius: 6px;
  font-size: 16px;
  color: #222;
  margin-bottom: 4px;
}

.login-input::placeholder {
  color: #d1d1d7;
  font-weight: 500;
}

.remember-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.login-checkbox {
  accent-color: #7c3aed;
  width: 18px;
  height: 18px;
}

.remember-label {
  color: #a1a1aa;
  font-size: 15px;
  user-select: none;
}

.login-btn {
  background: #7c3aed;
  color: #fff;
  font-size: 17px;
  font-weight: bold;
  border: none;
  padding: 13px 0;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #6827ce;
}

/* 회원가입 링크 스타일 */
.signup-link-row {
  margin-top: 14px;
  text-align: center;
  font-size: 15px;
  color: #aaa;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.signup-link {
  color: #7c3aed;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 2px;
}
.signup-link:hover {
  color: #5e22a7;
  text-decoration: underline;
}
</style>
