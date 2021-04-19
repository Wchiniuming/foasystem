<template>
  <div class='form'>
    <el-form :model="createForm" :rules="rules" ref="createForm" label-width="120px">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="createForm.projectName" style="width: 42%"></el-input>
      </el-form-item>
      <el-form-item label="测试系统" prop="targetSystem">
        <el-col :span='8'>
          <el-input v-model="createForm.targetSystem"></el-input>
        </el-col>
        <el-col :span='16'>
          <el-form-item label="版本" prop="systemVersion">
            <el-input v-model="createForm.systemVersion"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="类型" prop="projectType">
        <el-select v-model="createForm.projectType" placeholder="类型">
          <el-option label="功能测试" value="功能测试"></el-option>
          <el-option label="技术验证" value="技术验证"></el-option>
          <el-option label="流程管理" value="流程管理"></el-option>
          <el-option label="性能评估" value="性能评估"></el-option>
          <el-option label="系统建设" value="系统建设"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预计完成时间" required>
          <el-form-item prop="expectedDate">
            <el-date-picker type="date" placeholder="预计完成时间" v-model="createForm.expectedDate" style="width: 42%;"></el-date-picker>
          </el-form-item>
      </el-form-item>
      <el-form-item label="项目描述" prop="projectDesc">
        <el-col :span='20' style="width: 100%">
          <el-input type="textarea" :autosize='{ minRows: 8, maxRows: 18}' v-model="createForm.projectDesc" style="width: 100%"></el-input>
        </el-col>
        <el-col :span='4'>
            <el-button type='primary' size='small' @click='uploadFile' plain class="uploadBt">添加附件</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doCreate('createForm')">保存</el-button>
        <el-button @click="doCancel('createForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NewProject',
  data () {
    return {
      createForm: {
        projectName: '',
        targetSystem: '',
        systemVersion: '',
        projectType: '',
        expectedDate: '',
        projectDesc: ''
      },
      rules: {
        projectName: [
          { required: true, message: '该项目必填', trigger: 'blur' }
        ],
        targetSystem: [
          { required: true, message: '该项目必填', trigger: 'blur' }
        ],
        systemVersion: [
          { required: true, message: '该项目必填', trigger: 'blur' }
        ],
        projectType: [
          { required: true, message: '该项目必填', trigger: 'change' }
        ],
        expectedDate: [
          { type: 'date', required: true, message: '该项目必填', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    doCreate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    doCancel (formName) {
      this.$refs[formName].resetFields();
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .form {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .projectDesc {
    display: inline-block;
  }
  .uploadBt {
    margin-left: 20px;
  }
</style>
