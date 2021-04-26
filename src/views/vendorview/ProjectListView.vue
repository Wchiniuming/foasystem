<template>
  <div>
    <search-container>
      <template v-slot:queryCd>
        <el-form :inline="true" :model="projQueryForm" ref='projQueryForm' class="projQuery-form" style="width:100%">
          <el-col :span='20' style="width: 100%">
            <el-col :span='13' style="width: 100%">
              <el-form-item label='项目名称' prop='projectName'>
                <el-input v-model="projQueryForm.projectName" placeholder="项目名称" class='itemInput' clearable></el-input>
              </el-form-item>
              <el-form-item label='产品' prop='productName'>
                <el-input v-model="projQueryForm.productName" placeholder="产品" class='itemInput' clearable></el-input>
              </el-form-item>
              <el-form-item label="状态" prop='status'>
                <el-select v-model="projQueryForm.status" class='itemInput' placeholder="状态" clearable>
                  <el-option label="已完成" value="已完成"></el-option>
                  <el-option label="申请中" value="申请中"></el-option>
                  <el-option label="申请失败" value="申请失败"></el-option>
                  <el-option label="测试中" value="测试中"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='11' style="width: 100%">
              <el-form-item label='创建时间'>
                <el-form-item prop='beginDate'>
                  <el-date-picker
                    v-model='projQueryForm.beginDate'
                    type='date'
                    placeholder='创建时间'
                    >
                  </el-date-picker>
                </el-form-item>
                <span>-</span>
                <el-form-item  prop='endDate'>
                  <el-date-picker
                    v-model='projQueryForm.endDate'
                    type='date'
                    placeholder='结束时间'
                    >
                  </el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span='4' style="width: 100%">
            <el-form-item class='queryBt'>
              <el-button type="primary" small icon='el-icon-search' @click="onQuery('projQueryForm')">查询</el-button>
              <el-button type="info" small icon='el-icon-refresh' @click="resetForm('projQueryForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </template>
    </search-container>
    <div class='newProjectBt'>
      <el-button type='primary' @click='newProject' plain>新建</el-button>
    </div>
    <table-list
      :tableHeaders='tableHeadersProps'
      :tableData='projectDataProps'
      :controlType='controlType'
      :selectable='false'
      @edit='editProject'
      @delete='deleteProject'
      @projectView='viewProjectDetails'
      @caseView='viewCaseDetails'
      @passingView='viewTestResult'
      @certificatedView='viewCertification'
      >
    </table-list>
    <el-dialog
      :title="projectEditingForm.projectName"
      v-model="projectEditDialog"
      width="50%"
      destroy-on-close
      center>
        <el-form :model="projectEditingForm" :rules="editRules" ref="projectEditingForm" label-width="120px">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="projectEditingForm.projectName" style="width: 42%" placeholder='项目名称'></el-input>
          </el-form-item>
          <el-form-item label="产品" prop="productName">
            <el-col :span='8'>
              <el-input v-model="projectEditingForm.productName" placeholder='产品'></el-input>
            </el-col>
            <el-col :span='16'>
              <el-form-item label="版本" prop="productVer">
                <el-input v-model="projectEditingForm.productVer" placeholder='版本'></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="产品开发商" prop="company">
            <el-input v-model="projectEditingForm.company" placeholder='产品开发商' style="width: 42%"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="projectEditingForm.status" placeholder="项目状态">
              <el-option label="测试中" value="测试中"></el-option>
              <el-option label="已申请" value="已申请"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计完成时间" prop="finishedTime">
            <el-date-picker type="date" placeholder="预计完成时间" v-model="projectEditingForm.finishedTime" style="width: 42%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="紧急度" prop="projectLevel">
            <el-input v-model="projectEditingForm.projectLevel" placeholder='紧急度' style="width: 42%"></el-input>
          </el-form-item>
          <el-form-item label="入网许可" prop="certificated">
            <el-select v-model="projectEditingForm.certificated" placeholder="入网许可">
              <el-option label="已获得" value="已获得"></el-option>
              <el-option label="不合格" value="不合格"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目描述" prop="description" style="width: 100%">
            <el-input type="textarea" placeholder='项目描述' :autosize='{minRows: 5, maxRows: 10}' v-model="projectEditingForm.description" style="width: 100%"></el-input>
          </el-form-item>
        </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="projectEditDialog = false">取 消</el-button>
          <el-button type="primary" @click="onEditSave">保 存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :title="ctDialogForm.projectName"
      v-model="certificationDialog"
      width="50%"
      destroy-on-close
      center
      >
      <img src='@/assets/image/certification.jpg' style="width: 100%; height: 100%">
      <template #footer>
        <span class="dialog-footer" style="display: flex; justify-content: start">
          <el-button type="text" @click="onCertificationDownLoad">证书下载</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SearchContainer from '@/components/common/SearchContainer.vue'
import TableList from '@/components/common/TableList.vue'
import { projectListTableHeader } from '@/common/TableHeaders'
import { projectEditFormRules } from '@/common/FormRules'
import { getProjectData } from '@/api/getData'

export default {
  data () {
    return {
      controlType: 'editAndDelete',
      projectDataProps: [],
      projectData: [],
      // 证书查看页面
      certificationDialog: false,
      ctDialogForm: {},
      // 编辑窗口的属性信息
      projectEditDialog: false,
      projectEditingForm: {},
      editRules: {},
      // 查询窗口的属性信息
      projQueryForm: {
        projectName: '',
        productName: '',
        status: '',
        beginDate: '',
        endDate: ''
      },
      tableHeadersProps: []
    }
  },
  components: {
    SearchContainer,
    TableList
  },
  created () {
    this.getData({ pageNum: 1, pageSize: 20, projectInfo: {} })
    this.tableHeadersProps = projectListTableHeader
    this.editRules = projectEditFormRules
  },
  methods: {
    onQuery (formName) {
      const pqf = this.projQueryForm
      // 需要先判断是否为null，再判断长度是否为0
      const notNull = pqf.projectName.length === 0 && pqf.productName.length === 0 && pqf.status.length === 0 && (pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate === null || pqf.endDate.length === 0)
      if (notNull) {
        this.projectDataProps = this.projectData
      } else if ((pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate === null || pqf.endDate.length === 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.productName.match(pqf.productName) &&
            project.status.match(pqf.status)
          })
      } else if (((pqf.beginDate !== null && pqf.beginDate.length !== 0) && (pqf.endDate !== null && pqf.endDate.length !== 0))) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.productName.match(pqf.productName) &&
            project.status.match(pqf.status) &&
            new Date(project.createTime) >= new Date(pqf.beginDate) &&
            new Date(project.createTime) <= new Date(pqf.endDate)
          })
      } else if ((pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate !== null || pqf.endDate.length !== 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.productName.match(pqf.productName) &&
            project.status.match(pqf.status) &&
            new Date(project.createTime) <= new Date(pqf.endDate)
          })
      } else if ((pqf.beginDate !== null && pqf.beginDate.length !== 0) && (pqf.endDate === null || pqf.endDate.length === 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.productName.match(pqf.productName) &&
            project.status.match(pqf.status) &&
            new Date(project.createTime) >= new Date(pqf.beginDate)
          })
      } else {
        this.projectDataProps = this.projectData
      }
    },
    getData (queryCd) {
      getProjectData(queryCd).then(res => {
        console.log(res.data)
        if (res.data.code === 401) {
          alert('未认证，请先登录！')
          this.$router.push('/login')
          return
        }
        if (res.data.code === 200) {
          this.projectData = res.data.data.list
          this.projectDataProps = this.projectData
        } else {
          console.log(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    newProject () {
      this.$router.push({
        name: 'newProject'
      })
    },
    editProject (row) {
      this.projectEditingForm = row
      this.projectEditDialog = true
    },
    onEditSave () {
      // 发送post请求，提交数据变更
      // ...
      // 关闭dialog
      this.projectEditDialog = false
    },
    deleteProject (index, row) {
      this.$confirm('确定移除该条数据吗？').then(() => {
        this.projectData.splice(index, 1)
        this.projectDataProps = this.projectData
      }).catch(() => { return false })
    },
    viewProjectDetails (row) {
      this.$router.push(
        {
          name: 'projectDetails',
          params: { projectId: row.projectId }
        }
      )
    },
    viewCaseDetails (row) {
      this.$router.push(
        {
          name: 'caseDetailsView',
          params: { projectName: row.projectName }
        }
      )
    },
    viewTestResult (row) {
      this.$router.push(
        {
          name: 'testResult',
          params: {
            projectName: row.projectName,
            data: JSON.stringify(row)
          }
        }
      )
    },
    viewCertification (row) {
      if (row.certificated === '已获得') {
        this.ctDialogForm = row
        this.certificationDialog = true
      } else {
        return false
      }
    },
    onCertificationDownLoad () {
      // 下载功能实现①通过超链接直接访问后端下载;
    }
  }
}
</script>

<style scoped>
  .itemInput {
    width: 145px;
  }
  .newProjectBt {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
