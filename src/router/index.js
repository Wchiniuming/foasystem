import {
  createRouter,
  createWebHistory
} from 'vue-router'
const projectList = () => import('@/views/vendorview/ProjectListView')
const newProject = () => import('@/views/vendorview/NewProject')
const caseDetailsView = () => import('@/views/vendorview/CaseDetailsView')
const projectDetails = () => import('@/views/vendorview/ProjectDetails')
const casesMaintain = () => import('@/views/testerview/CasesMaintain')
const resultUpload = () => import('@/views/testerview/ResultUpload')
const testerMainView = () => import('@/views/testerview/TesterMainView')

const routes = [
  {
    path: '/',
    redirect: '/projectlist'
  },
  {
    path: '/projectlist',
    name: 'projectList',
    component: projectList
  },
  {
    path: '/newproject',
    name: 'newProject',
    component: newProject
  },
  {
    path: '/casedetails/:projectName',
    name: 'caseDetailsView',
    component: caseDetailsView
  },
  {
    path: '/projectdetails/:projectId',
    name: 'projectDetails',
    component: projectDetails
  },
  {
    path: '/casesmaintain/:projectName',
    name: 'casesMaintain',
    component: casesMaintain
  },
  {
    path: '/testresult/:projectName',
    name: 'testResult',
    component: resultUpload
  },
  {
    path: '/testermain',
    name: 'testerMainView',
    component: testerMainView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
