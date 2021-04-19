import {
  createRouter,
  createWebHistory
} from 'vue-router'
const vendor = () => import('../views/vendorview/VendorView')
const newProject = () => import('../views/vendorview/NewProject')
const caseDetails = () => import('../views/vendorview/CaseDetails')

const routes = [
  {
    path: '/',
    redirect: '/vendor'
  },
  {
    path: '/vendor',
    name: 'vendor',
    component: vendor
  },
  {
    path: '/vendor/newproject',
    name: 'newproject',
    component: newProject
  },
  {
    path: '/vendor/casedetails/:projName',
    name: 'casedetails',
    component: caseDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
