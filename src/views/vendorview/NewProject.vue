<template>
  <div>
    <div class="header">
      <h2>新建项目</h2>
    </div>
    <div class='form'>
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="120px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="createForm.projectName" style="width: 42%" placeholder='项目名称'></el-input>
        </el-form-item>
        <el-form-item label="测试系统" prop="targetSystem">
          <el-col :span='8'>
            <el-input v-model="createForm.targetSystem" placeholder='测试系统'></el-input>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="版本" prop="systemVersion">
              <el-input v-model="createForm.systemVersion" placeholder='系统版本'></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="系统开发商" prop="systemDeveloper">
          <el-input v-model="createForm.systemDeveloper" placeholder='系统开发商'></el-input>
        </el-form-item>
        <el-form-item label="预计完成时间" prop="expectedDate">
          <el-date-picker type="date" placeholder="预计完成时间" v-model="createForm.expectedDate" style="width: 42%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="projectState">
          <el-col :span='8'>
            <el-select v-model="createForm.projectState" placeholder="项目状态">
              <el-option label="测试中" value="测试中"></el-option>
              <el-option label="已申请" value="已申请"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-col>
          <el-col :span='16'>
          <el-form-item label="紧急度" prop="emergencyLevel">
            <el-input v-model="createForm.emergencyLevel" placeholder='紧急度' ></el-input>
          </el-form-item>
        </el-col>
        </el-form-item>
        <el-form-item label="项目描述" prop="projectDesc" style="width: 100%">
          <el-input type="textarea" placeholder='项目描述' :autosize='{minRows: 5, maxRows: 10}' v-model="createForm.projectDesc" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">附件上传</el-button>
            <template #tip>
              <div class="el-upload__tip">不得超过5个</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doCreate('createForm')">保存</el-button>
          <el-button @click="doCancel('createForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { projectCreateFormRules } from '@/common/FormRules'

export default {
  name: 'NewProject',
  data () {
    return {
      createForm: {
        projectName: '',
        targetSystem: '',
        systemVersion: '',
        projectState: '',
        expectedDate: '',
        emergencyLevel: '',
        projectDesc: '',
        systemDeveloper: ''
      },
      rules: {},
      fileList: [
        {
          name: 'ccc.dox',
          url: ''
        }
      ]
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
    },
    // 上传附件相关
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  created () {
    this.rules = projectCreateFormRules
  }
}
</script>

<style scoped>
  .form {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
</style>
