<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img
            src="../assets/undraw_Notebook_re_id0r.svg"
            alt="callout"
            class="w-50"
          >
          <h2 class="font-weight-light mt-5">
            随心写作，自由表达
          </h2>
          <p>
            <a
              href="#"
              class="btn btn-primary my-2"
              @click="createArticle"
            >开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">
      发现精彩
    </h4>
    <column-list :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps } from '../store'
import ColumnList from '../components/ColumnList.vue'
export default defineComponent({
	name: 'Home',
	components: {
		ColumnList
	},
	setup() {
		const router = useRouter()
		const store = useStore<GlobalDataProps>()
		onMounted(() => {
			store.dispatch('fetchColumns')
		})
		const createArticle = () => {
			router.push('/create')
		}
		const list = computed(() => store.state.columns)
		return {
			list,
			createArticle
		}
	}
})
</script>