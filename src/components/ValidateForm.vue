<template>
  <form class="validate-form-container">
    <slot name="default" />
    <div
      class="submit-area"
      @click.prevent="submitForm"
    >
      <slot name="submit">
        <button
          type="submit"
          class="btn btn-primary"
        >
          提交
        </button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type validateFunc = () => boolean
type ClearFunc = () => void
type Events = {
  'form-item-created': validateFunc
  'form-item-clear': ClearFunc
}
export const emitter = mitt<Events>()
export default defineComponent({
	emits: ['form-submit'],
	setup(props, context) {
		let funcArr: validateFunc[] =[]
		let funcClearArr: ClearFunc[] =[]
		const submitForm = () => {
			// 这里map返回boolean数组，再通过every返回所有结果
			const result = funcArr.map(func => func()).every(result => result)
			funcClearArr.map(func => func())
			context.emit('form-submit', result)
		}
		const callback = (func?: validateFunc) => {
			if(func) {
				funcArr.push(func)
			}
		}
		const clearCallback = (func?: ClearFunc) => {
			if(func) {
				funcClearArr.push(func)
			}
		}
		emitter.on('form-item-created', callback)
		emitter.on('form-item-clear', clearCallback)
		onUnmounted(() => {
			emitter.off('form-item-created', callback)
			emitter.off('form-item-clear', clearCallback)
			funcArr = []
			funcClearArr = []
		})
		return {
			submitForm
		}
	}
})
</script>

<style>

</style>