export const projectEditFormRules = {
  projectName: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  productName: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  productVer: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '该项目必填' }
  ],
  finishedTime: [
    { required: true, message: '该项目必填', trigger: 'blur' },
    { type: 'date', required: true, message: '格式不正确', trigger: ['change', 'blur'] }
  ],
  projectLevel: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  certificated: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  company: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ]
}
export const caseEditFormRules = {
  useCaseId: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  module1: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  module2: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  module3: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  module4: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  useCaseName: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  purpose: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  beforeTest: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  steps: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  expectResult: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ]
}
export const projectCreateFormRules = {
  projectName: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  productName: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  productVer: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  company: [
    { required: true, message: '该项目必填' }
  ],
  status: [
    { required: true, message: '该项目必填' }
  ],
  contactMan: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: '该项目必填', trigger: 'blur' },
    { pattern: /^1[3|5|7|8|9]\d{9}$/, required: true, message: '格式不正确', trigger: ['change', 'blur'] }
  ],
  contactEmail: [
    { required: true, message: '该项目必填', trigger: 'blur' },
    { type: 'email', required: true, message: '格式不正确', trigger: ['change', 'blur'] }
  ],
  projectLevel: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ]
}
export const loginFormRule = {
  userName: [
    { required: true, message: '请填入用户名', trigger: 'blur' }
  ],
  passWord: [
    { required: true, message: '请填入用户密码', trigger: 'blur' }
  ]
}
