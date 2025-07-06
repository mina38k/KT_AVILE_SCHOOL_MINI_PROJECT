<template>
  <div class="signup-container">
    <form class="signup-box" @submit.prevent="signup">
      <h2>Sign Up</h2>
      <input
        v-model="userName"
        placeholder="이름"
        class="signup-input"
        required
      />
      <input
        v-model="loginId"
        placeholder="아이디"
        class="signup-input"
        autocomplete="username"
        required
      />
      <input
        v-model="loginPw"
        type="password"
        placeholder="비밀번호"
        class="signup-input"
        autocomplete="new-password"
        required
      />
      <div class="remember-row">
        <input
          id="remember"
          type="checkbox"
          v-model="rememberId"
          class="signup-checkbox"
        />
        <label for="remember" class="remember-label">아이디 저장하기</label>
      </div>
      <button type="submit" class="signup-btn">Sign Up</button>
      <div class="login-link-row">
        <span>이미 회원이신가요?</span>
        <router-link to="/login" class="login-link">로그인</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const userName = ref('')
const loginId = ref('')
const loginPw = ref('')
const rememberId = ref(false)
const router = useRouter()

onMounted(() => {
  const saved = localStorage.getItem('signupSavedLoginId')
  if (saved) {
    loginId.value = saved
    rememberId.value = true
  }
})

async function signup() {
  if (userName.value && loginId.value && loginPw.value) {
    try {
      await axios.post('/userInfos', {
        userName: userName.value,
        loginId: loginId.value,
        loginPw: loginPw.value,
      })
      if (rememberId.value) {
        localStorage.setItem('signupSavedLoginId', loginId.value)
      } else {
        localStorage.removeItem('signupSavedLoginId')
      }
      alert('회원가입 성공! 로그인 해주세요.')
      router.push('/login')
    } catch (e) {
      alert('회원가입 실패: ' + (e.response?.data?.message || e.message))
    }
  } else {
    alert('모든 정보를 입력하세요.')
  }
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafd;
}
.signup-box {
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
.signup-box h2 {
  color: #7c3aed;
  font-size: 26px;
  margin-bottom: 8px;
  font-weight: 700;
}
.signup-input {
  background: #f8f8fa;
  border: none;
  outline: none;
  padding: 14px 12px;
  border-radius: 6px;
  font-size: 16px;
  color: #222;
  margin-bottom: 4px;
}
.signup-input::placeholder {
  color: #d1d1d7;
  font-weight: 500;
}
.remember-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.signup-checkbox {
  accent-color: #7c3aed;
  width: 18px;
  height: 18px;
}
.remember-label {
  color: #a1a1aa;
  font-size: 15px;
  user-select: none;
}
.signup-btn {
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
.signup-btn:hover {
  background: #6827ce;
}
.login-link-row {
  margin-top: 14px;
  text-align: center;
  font-size: 15px;
  color: #aaa;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.login-link {
  color: #7c3aed;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 2px;
}
.login-link:hover {
  color: #5e22a7;
  text-decoration: underline;
}
</style>
