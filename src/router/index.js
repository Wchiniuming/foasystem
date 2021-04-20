import {
  createRouter,
  createWebHistory
} from 'vue-router'
const projectList = () => import('@/views/vendorview/ProjectListView')
const newProject = () => import('@/views/vendorview/NewProject')
const caseDetails = () => import('@/views/vendorview/CaseDetails')
const projectDetails = () => import('@/views/vendorview/ProjectDetails')

const routes = [
  {
    path: '/',
    redirect: '/projectlist'
  },
  {
    path: '/projectlist',
    name: 'projectlist',
    component: projectList
  },
  {
    path: '/newproject',
    name: 'newproject',
    component: newProject
  },
  {
    path: '/casedetails/:projName',
    name: 'casedetails',
    component: caseDetails
  },
  {
    path: '/projectdetails/:projName',
    name: 'projectdetails',
    component: projectDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
