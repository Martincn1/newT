<template>
  <div class="container">
    <global-header :user="testUser" />
    <!-- <column-list :list="testData"/> -->
    <!-- <validate-form @form-submit="submitForm">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
          :rules="emailRules"
        />
        {{ emailVal }}
      </div>
      <div class="mb-3">
        <label
          for="exampleInputPassword1"
          class="form-label"
        >密码</label>
        <validate-input
          v-model="pwdVal"
          type="password"
          placeholder="请输入密码"
          :rules="pwdRules"
        />
      </div>
    </validate-form> -->
    <router-view />
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
// import ValidateForm from './components/ValidateForm.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'

import 'bootstrap/dist/css/bootstrap.min.css'


const testUser: UserProps = {
	isLogin: false
}
export default defineComponent({
	name: 'App',
	components: {
		// ColumnList,
		GlobalHeader,
		// ValidateInput,
		// ValidateForm
	},
	setup () {
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
		const submitForm = (result: boolean) => {
			console.log(result, 'result')
		}
		return {
			// testData,
			testUser,
			emailRules,
			emailVal,
			pwdRules,
			pwdVal,
			submitForm
		}
	}
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
