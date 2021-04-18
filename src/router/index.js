import {
  createRouter,
  createWebHistory
} from 'vue-router'
const vendor = () => import('../views/vendorview/VendorView')

const routes = [
  {
    path: '/vendor',
    name: 'vendor',
    component: vendor
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
