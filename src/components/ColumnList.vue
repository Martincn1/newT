<template>
  <div class="row">
      <div v-for="item in columnList" :key="item.id" class="col-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <img :src="item.avatar" :alt="item.title" class="rounded-circle border border-light w-25 my-3">
              <h5 class="card-title">{{item.title}}</h5>
              <p class="card-text card-left">{{item.desc}}</p>
              <a href="#" class="btn btn-primary">进入专栏</a>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/runtime-core'

export interface ColumnProps {
    id: number,
    title: string,
    avatar?: string,
    desc: string
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(i => {
        if (!i.avatar) {
          i.avatar = require('@/assets/logo.png')
        }
        return i
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style>

</style>
