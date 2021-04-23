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
const provinceMainView = () => import('@/views/provinceview/ProvinceView')
const login = () => import('@/views/login/Login')

const routes = [
  {
    path: '/',
    redirect: '/projectlist'
  },
  {
    path: '/projectlist',
    name: 'projectList',
    component: projectList,
    meta: {
      title: '厂商主页'
    }
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/newproject',
    name: 'newProject',
    component: newProject,
    meta: {
      title: '新建项目'
    }
  },
  {
    path: '/casedetails/:projectName',
    name: 'caseDetailsView',
    component: caseDetailsView,
    meta: {
      title: '测试用例详情'
    }
  },
  {
    path: '/projectdetails/:projectId',
    name: 'projectDetails',
    component: projectDetails,
    meta: {
      title: '项目详情'
    }
  },
  {
    path: '/casesmaintain/:projectName',
    name: 'casesMaintain',
    component: casesMaintain,
    meta: {
      title: '测试用例管理'
    }
  },
  {
    path: '/testresult/:projectName',
    name: 'testResult',
    component: resultUpload,
    meta: {
      title: '测试结果管理'
    }
  },
  {
    path: '/testermain',
    name: 'testerMainView',
    component: testerMainView,
    meta: {
      title: '测试人员主页'
    }
  },
  {
    path: '/provincemain',
    name: 'provinceMainView',
    component: provinceMainView,
    meta: {
      title: '省公司主页'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
