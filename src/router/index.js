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
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/projectlist',
    name: 'projectList',
    component: projectList,
    meta: {
      title: '厂商主页',
      role: 'vendor'
    }
  },
  {
    path: '/newproject',
    name: 'newProject',
    component: newProject,
    meta: {
      title: '新建项目',
      role: 'vendor'
    }
  },
  {
    path: '/casedetails/:projectName',
    name: 'caseDetailsView',
    component: caseDetailsView,
    meta: {
      title: '测试用例详情',
      role: 'vendor'
    }
  },
  {
    path: '/projectdetails/:projectId',
    name: 'projectDetails',
    component: projectDetails,
    meta: {
      title: '项目详情',
      role: 'vendor'
    }
  },
  {
    path: '/casesmaintain/:projectName',
    name: 'casesMaintain',
    component: casesMaintain,
    meta: {
      title: '测试用例管理',
      role: 'tester'
    }
  },
  {
    path: '/testresult/:projectName',
    name: 'testResult',
    component: resultUpload,
    meta: {
      title: '测试结果管理',
      role: ['tester', 'vendor']
    }
  },
  {
    path: '/testermain',
    name: 'testerMainView',
    component: testerMainView,
    meta: {
      title: '测试人员主页',
      role: 'tester'
    }
  },
  {
    path: '/provincemain',
    name: 'provinceMainView',
    component: provinceMainView,
    meta: {
      title: '省公司主页',
      role: 'province'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 设置路由守卫，判定是否已登录，如果未登录，则跳转至登录页面
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
    return
  }
  // 必须以next()结尾，否则会陷入无限路由循环问题
  if (!localStorage.getItem('token')) {
    next({
      name: 'login'
    })
  } else if (localStorage.getItem('role') !== to.meta.role) { // 如果当前登录的角色与相应路由的角色不符，则无法进行访问
    next({
      name: '404'
    })
  } else {
    next()
  }
})

export default router
