import { Ref, ref, onMounted, onUnmounted } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>):Ref<boolean> => {
	const isClickOutside = ref(false)
	const handler = (e: MouseEvent) => {
		if (elementRef.value && elementRef.value.contains(e.target as HTMLElement)) { // 如果点在dropdown元素里面
			isClickOutside.value = false
		} else {
			isClickOutside.value = true
		}
	}

	onMounted(() => {
		document.addEventListener('click', handler)
	})
	onUnmounted(() => {
		document.removeEventListener('click', handler)
	})

	return isClickOutside
}

export default useClickOutside
