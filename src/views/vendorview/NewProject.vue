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
        <el-form-item label="测试产品" prop="productName">
          <el-col :span='8'>
            <el-input v-model="createForm.productName" placeholder='测试产品'></el-input>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="版本" prop="productVer">
              <el-input v-model="createForm.productVer" placeholder='产品版本'></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="产品开发商" prop="company">
          <el-col :span='8'>
            <el-select v-model="createForm.company" placeholder="厂商">
              <el-option label="华为" value="华为"></el-option>
              <el-option label="亚信" value="亚信"></el-option>
              <el-option label="中兴" value="中兴"></el-option>
              <el-option label="新大陆" value="新大陆"></el-option>
              <el-option label="爱立信" value="爱立信"></el-option>
            </el-select>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="紧急度" prop="projectLevel">
              <el-select v-model="createForm.projectLevel" placeholder="紧急度">
                <el-option label="低" value="低"></el-option>
                <el-option label="中" value="中"></el-option>
                <el-option label="高" value="高"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="联系人" prop="contactMan">
          <el-input v-model="createForm.contactMan" placeholder='联系人' style="width: 42%"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-col :span='8'>
            <el-input v-model="createForm.contactPhone" placeholder='电话'></el-input>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="电子邮件" prop="contactEmail">
              <el-input v-model="createForm.contactEmail" placeholder='邮件'></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="项目描述" prop="description" style="width: 100%">
          <el-input type="textarea" placeholder='项目描述' :autosize='{minRows: 5, maxRows: 10}' v-model="createForm.description" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            action=""
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-change="handleUpload"
            :auto-upload="false"
            :limit="5"
            accept=".xlsx, .xls"
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
import { createProject, uploadFiles } from '@/api/createData'
import { upload } from '@/utils/upload'
import xlsx from 'xlsx'

export default {
  name: 'NewProject',
  data () {
    return {
      createForm: {
        projectName: '',
        productName: '',
        productVer: '',
        projectLevel: '',
        description: '',
        company: '',
        contactMan: '',
        contactPhone: '',
        contactEmail: ''
      },
      rules: {},
      fileList: [],
      fileListData: []
    }
  },
  methods: {
    doCreate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createProject(this.createForm).then(res => {
            if (res.data.code === 2001 || res.data.code === 2009) {
              this.$alert('账号超时，请重新登录！', '超时', {
                confirmButtonText: 'OK',
                callback: () => {
                  this.$router.replace('/login')
                }
              })
            }
            if (res.data.code === 200) {
              uploadFiles({ projectId: res.data.data, files: this.fileListData }).then(subRes => {
                this.$message({ message: '项目新建成功', type: 'success' })
                setTimeout(() => { this.$router.back() }, 3000)
              }).catch(subRes => {
                this.$message({ message: '项目新建成功，但附件上传失败，请检查附件！', type: 'error' })
                setTimeout(() => { this.$router.back() }, 3000)
                console.log('上传失败')
                console.log(subRes)
              })
            } else {
              this.$message({ message: '项目新建失败！', type: 'error' })
              console.log('保存失败', res.data)
            }
          }).catch(err => {
            this.$message({ message: '网络请求异常，请稍后再试！', type: 'error' })
            console.log('网络请求异常', err)
          })
        }
      });
    },
    async handleUpload (ev) {
      // 获取时间的目标对象，并解析
      const file = ev.raw
      const name = file.name
      if (!file) return
      let reader = await upload(file)
      // 读取识别目标对象，将其编译出来
      const worker = xlsx.read(reader, { type: 'binary' })
      // 将返回的数据转换为json对象的数据
      reader = xlsx.utils.sheet_to_json(worker.Sheets[worker.SheetNames[0]])
      this.fileList.push({ name: name, data: reader, status: 'success' })
      this.fileListData.push(reader)
      // 将解析的数据进行字段对应，并通过接口传递至后端(根据接口的要求，确定是解析后上传还是直接上传reader的形式)
    },
    doCancel (formName) {
      this.$refs[formName].resetFields();
      this.$router.back()
    },
    // 上传附件相关
    handleRemove (file, fileList) {
      this.fileList = fileList
      this.fileListData.splice(this.fileListData.indexOf(file), 1)
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
