<template>
  <div class="dropdown" ref="dropdownRef">
    <a @click.prevent="toggleOpen" href="#" class="btn btn-outline-light my-2 dropdown-toggle">你好！{{ title }}</a>
    <ul v-if="isOpen" class="dropdown-menu" :style="{display: 'block'}">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>

<style>
</style>
