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
    { type: 'date', required: true, message: '该项目必填', trigger: 'blur' }
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
  finishedTime: [
    { type: 'date', required: true, message: '该项目必填', trigger: 'blur' }
  ],
  company: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '该项目必填' }
  ]
}
export const loginFormRule = {
  userName: [
    { required: true, message: '请填入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请填入用户密码', trigger: 'blur' }
  ]
}
