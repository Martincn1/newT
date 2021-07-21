import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'

const routerHistory = createWebHistory()
const router = createRouter({
	history: routerHistory, // 使用哪种类型的路由
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				redirectLogin: true
			}
		},
		{
			path: '/column/:id',
			name: 'column',
			component: ColumnDetail
		},
		{
			path: '/create',
			name: 'create',
			component: CreatePost,
			meta: {
				needLogin: true
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	console.log('to.meta', to.meta)
	if (to.meta.needLogin && !store.state.user.isLogin) {
		next({ name: 'login' })
	} else if (to.meta.redirectLogin && store.state.user.isLogin) {
		next('/')
	} else {
		next()
	}
})

export default router