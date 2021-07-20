<template>
  <div class="validate-input-container pb3">
    <input
      v-bind="$attrs"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInputed"
      @input="updateValue"
    >
    <span
      v-if="inputRef.error"
      class="invalid-feedback"
    >{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const pwdReg = /^[0-9]{6,18}$/
interface strLimit {
  message: string;
  length: number;
}
interface RuleProp {
  type: 'required' | 'email' | 'password' | 'range';
  message?: string;
  min?: strLimit;
  max?: strLimit;
}
export type RulesProp = RuleProp[];
export default defineComponent({
	inheritAttrs: false, // 不希望组件的根元素继承attribute,有了inheritAttrs：false和$attrs,就可以手动决定这些attribute会被赋予哪些元素
	props: {
		rules: {
			type: Array as PropType<RulesProp>,
			default: () => []
		},
		modelValue: {
			type: String,
			default: ''
		},
	},
	emits: ['update:modelValue'],

	setup(props, context) {
		const inputRef = reactive({
			val: props.modelValue || '',
			error: false,
			message: '',
		})
		const clearVal = () => {
			inputRef.val = ''
		}
		const validateInputed = () => {
			if (props.rules) {
				const allPassed = props.rules.every((rule) => {
					let passed = true
					const { val } = inputRef
					inputRef.message = rule.message || ''
					switch (rule.type) {
					case 'required':
						passed = val.trim() !== ''
						break
					case 'email':
						passed = emailReg.test(val)
						break
					case 'password':
						passed = pwdReg.test(val)
						break
					case 'range':
						if (rule.min && rule.max) {
							const { min, max } = rule
							if (val.toString().trim().length < min.length) {
								inputRef.message = min.message
								passed = false
							}
							if (val.toString().trim().length > max.length) {
								inputRef.message = max.message
								passed = false
							}
						}
						break
					default:
						break
					}
					return passed
				})
				inputRef.error = !allPassed
				return allPassed
			}
			return true
		}
		const updateValue = (e: KeyboardEvent) => {
			const targetValue = (e.target as HTMLInputElement).value
			inputRef.val = targetValue
			context.emit('update:modelValue', targetValue)
		}
		onMounted(() => {
			emitter.emit('form-item-created', validateInputed)
			emitter.emit('form-item-clear', clearVal)
		})
		return {
			inputRef,
			validateInputed,
			updateValue
		}
	},
})
</script>

<style></style>
