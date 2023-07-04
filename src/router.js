import { createRouter, createWebHashHistory } from 'vue-router'
import GodComp from './components/God.vue'
import Home from './components/Home.vue'
import JoinComp from './components/Join.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: JoinComp },
  { path: '/home', component: Home },
  { path: '/god', component: GodComp },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && to.path !== '/god' && !sessionStorage.getItem('userId')) next({ path: '/' })
  else next()
})

export default router