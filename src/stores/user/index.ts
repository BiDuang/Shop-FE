import { defineStore } from 'pinia'
import user from '@/apis/user'
import type {
  LoginForm,
  UserState,
  User,
  UserToken,
  RegisterForm,
  RecoverForm,
} from '@/models/user'

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

    isLogined() {
      return this.uid !== undefined
    },

    async login(loginForm: LoginForm) {
      try {
        const loginRes = await user.login(loginForm)
        const token = loginRes.data as UserToken
        localStorage.setItem('token', token.access_token)
        return true
      } catch {
        return false
      }
    },

    async update() {
      if (!localStorage.getItem('token')) {
        return false
      }
      try {
        const profileRes = await user.getProfile()
        this.setInfo(profileRes.data as User)
        return true
      } catch {
        return false
      }
    },

    async logout() {
      localStorage.removeItem('token')
      this.$reset()
    },

    async register(registerForm: RegisterForm, requestId: string) {
      try {
        await user.register(registerForm, requestId)
        return true
      } catch {
        return false
      }
    },

    async recover(recoverForm: RecoverForm, requestId: string) {
      try {
        const res = await user.recover(recoverForm, requestId)
        return res.data!
      } catch {
        return null
      }
    },

    async registerCaptcha(email: string) {
      try {
        const res = await user.registerCaptcha(email)
        return res.data!
      } catch {
        return null
      }
    },

    async recoverCaptcha(email: string) {
      try {
        const res = await user.recoverCaptcha(email)
        return res.data!
      } catch {
        return null
      }
    },
  },
})

export default useUserStore
