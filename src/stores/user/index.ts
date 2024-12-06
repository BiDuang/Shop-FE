import { defineStore } from 'pinia'
import user from '@/apis/user'
import type { LoginForm, UserState, User, UserToken, RegisterForm } from '@/models/user'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    uid: undefined,
    username: undefined,
    email: undefined,
    permission: undefined,
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },
  actions: {
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    async login(loginForm: LoginForm) {
      try {
        const loginRes = await user.login(loginForm)
        const token = loginRes.data as UserToken
        localStorage.setItem('token', JSON.stringify(token.access_token))
        return true
      } catch (e) {
        return false
      }
    },
    async update() {
      if (!localStorage.getItem('token')) {
        return false
      }
      try {
        const profileRes = await user.profile()
        this.setInfo(profileRes.data as User)
        return true
      } catch (e) {
        return false
      }
    },
    async logout() {
      localStorage.removeItem('token')
      this.$reset()
    },
    async register(registerForm: RegisterForm) {
      try {
        await user.register(registerForm)
        return true
      } catch (e) {
        return false
      }
    },
  },
})

export default useUserStore
