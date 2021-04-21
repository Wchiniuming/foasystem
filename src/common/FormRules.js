export const projectEditFormRules = {
  projectName: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  targetSystem: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  systemVersion: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  projectState: [
    { required: true, message: '该项目必填' }
  ],
  expectedDate: [
    { type: 'date', required: true, message: '该项目必填', trigger: 'blur' }
  ],
  emergencyLevel: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  certificated: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  systemDeveloper: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ]
}

export const projectCreateFormRules = {
  projectName: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  targetSystem: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  systemVersion: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  expectedDate: [
    { type: 'date', required: true, message: '该项目必填', trigger: 'blur' }
  ],
  systemDeveloper: [
    { required: true, message: '该项目必填', trigger: 'blur' }
  ],
  projectState: [
    { required: true, message: '该项目必填' }
  ]
}
