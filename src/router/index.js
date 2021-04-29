import {
  createRouter,
  createWebHistory
} from 'vue-router'
import storage from '@/utils/storage'

const projectList = () => import('@/views/vendorview/ProjectListView')
const newProject = () => import('@/views/vendorview/NewProject')
const caseDetailsView = () => import('@/views/vendorview/CaseDetailsView')
const projectDetails = () => import('@/views/vendorview/ProjectDetails')
const casesMaintain = () => import('@/views/testerview/CasesMaintain')
const resultUpload = () => import('@/views/testerview/ResultUpload')
const testerMainView = () => import('@/views/testerview/TesterMainView')
const provinceMainView = () => import('@/views/provinceview/ProvinceView')
const login = () => import('@/views/login/Login')
const Main = () => import('@/views/main/Main')

// 0未分配，1代表管理员，2普通，3代表厂商，4代表省公司，5代表测试方
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
    path: '/main',
    component: Main,
    children: [
      {
        path: 'admin',
        name: 'adminMainView',
        component: projectList,
        meta: {
          title: '项目信息管理',
          roleId: [1, 3]
        }
      },
      {
        path: 'vendor',
        name: 'vendorMainView',
        component: projectList,
        meta: {
          title: '项目信息管理',
          roleId: [1, 3]
        }
      },
      {
        path: 'tester',
        name: 'testerMainView',
        component: testerMainView,
        meta: {
          title: '测试信息管理',
          roleId: [1, 5]
        }
      },
      {
        path: 'province',
        name: 'provinceMainView',
        component: provinceMainView,
        meta: {
          title: '省公司主页',
          roleId: [1, 4]
        }
      },
      {
        path: 'createproject',
        name: 'createProject',
        component: newProject,
        meta: {
          title: '新建项目',
          roleId: [1, 3]
        }
      },
      {
        path: 'projectdetails/:projectId',
        name: 'projectDetails',
        component: projectDetails,
        meta: {
          title: '项目详情',
          roleId: [1, 3]
        }
      },
      {
        path: 'casesmaintain/:projectId',
        name: 'casesMaintain',
        component: casesMaintain,
        meta: {
          title: '测试用例管理',
          roleId: [1, 5]
        }
      },
      {
        path: 'casedetails/:projectId',
        name: 'caseDetailsView',
        component: caseDetailsView,
        meta: {
          title: '测试用例详情',
          roleId: [1, 3]
        }
      },
      {
        path: 'testresult/:projectId',
        name: 'testResult',
        component: resultUpload,
        meta: {
          title: '测试结果管理',
          roleId: [1, 3, 5]
        }
      }
    ]
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
  // 必须以next()结尾，否则会陷入无限路由循环问题  后续改为使用token的方式storage.get('token')
  // if (!sessionStorage.get('JSESSIONID')) {
  //   next({
  //     name: 'login'
  //   })
  // } else
  // 判断用户是否具备访问目标页面的权限
  let doAccess = 0
  console.log(storage.get('logonUserRole'))
  if (storage.get('logonUserRole')) {
    storage.get('logonUserRole').forEach(id => {
      if (to.meta.roleId.indexOf(id) >= 0) {
        doAccess++
      }
    })
  } else {
    next('/login')
    return
  }
  if (doAccess === 0) {
    alert('不可越权访问！')
    next({
      name: 404
    })
  } else {
    document.title = to.meta.title
    next()
  }
})

export default router
