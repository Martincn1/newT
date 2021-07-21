<template>
  <div class="login-page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址{{ store.state.user }}</label>
        <validate-input
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
          :rules="emailRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          v-model="pwdVal"
          type="password"
          placeholder="请输入密码"
          :rules="pwdRules"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

export default defineComponent({
	name: 'Login',
	components: {
		ValidateInput,
		ValidateForm
	},
	setup() {
		const router = useRouter()
		const store = useStore<GlobalDataProps>()
		const emailVal = ref('')
		const pwdVal = ref('')
		const emailRules: RulesProp = [
			{ type: 'required', message: '邮箱地址不能为空' },
			{ type: 'email', message: '请输入有效的邮箱地址' }
		]
		const pwdRules: RulesProp = [
			{ type: 'required', message: '密码不能为空' },
			{ type: 'range', min: { message: '你的密码至少包含6位，不含空格', length: 6 }, max: { message: '你的密码最多包含18位，不含空格', length: 18 } }
		]

		const onFormSubmit = (result: boolean) => {
			if (result) {
				router.push('/')
				store.commit('login')
			}
		}
		return {
			emailRules,
			emailVal,
			pwdRules,
			pwdVal,
			store,
			onFormSubmit
		}
	}
})
</script>