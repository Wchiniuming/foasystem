<template>
  <div>
    <div class="customControlBt">
      <el-badge :value="numOfTodo" style="margin-right: 50px">
        <el-button type="primary" plain icon='el-icon-s-custom' @click="myWorkbench('caseQueryForm')">我的工作台</el-button>
      </el-badge>
      <el-button type="primary" plain icon='el-icon-s-data' @click="statisticalAnalysis('caseQueryForm')">统计</el-button>
    </div>
    <search-container>
      <template v-slot:queryCd>
        <el-form :inline="true" :model="queryForm" ref='queryForm' style="width:100%;padding-left:10px;">
          <el-col :span='20' style="width: 100%">
            <el-form-item label='项目名称' prop="projectName">
              <el-input v-model="queryForm.projectName" placeholder="项目名称" clearable></el-input>
            </el-form-item>
            <el-form-item label='版本' prop="productVer">
              <el-input v-model="queryForm.productVer" placeholder="版本" clearable></el-input>
            </el-form-item>
            <el-form-item label='状态' prop="status">
              <el-select v-model="queryForm.status" placeholder="状态" clearable>
                <el-option label="已完成" value="已完成"></el-option>
                <el-option label="申请中" value="申请中"></el-option>
                <el-option label="申请失败" value="申请失败"></el-option>
                <el-option label="测试中" value="测试中"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='4' style="width: 100%; text-align: end;">
            <el-form-item class='queryBt'>
              <el-button type="primary" small icon='el-icon-search' @click="onQuery('queryForm')">查询</el-button>
              <el-button type="info" small icon='el-icon-refresh' @click="resetForm('queryForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </template>
    </search-container>
    <project-table-list
      :passRCl='false'
      :caseNumCl='false'
      :tableHeaders='tableHeaders'
      :tableData='dataProps'
      :controlType='controlType'
      @uploadCase='doUploadCase'
      @uploadResult='doUploadResult'
      @issueLicense='doIssueLicense'
      @caseView='viewCaseDetails'
      @certificatedView='viewCertification'
      @projectView='viewProjectDetails'
      ></project-table-list>
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
import SearchContainer from '@/components/common/SearchContainer'
import ProjectTableList from '@/components/common/ProjectTableList'
import { testMainViewHeaders } from '@/common/TableHeaders'
import { getProjectData } from '@/api/getData'

export default {
  name: 'TestMainView',
  data () {
    return {
      tableHeaders: testMainViewHeaders,
      certificationDialog: false,
      ctDialogForm: {},
      dataProps: [],
      dataList: [],
      controlType: 'upload',
      queryForm: {
        projectName: '',
        productVer: '',
        status: ''
      },
      numOfTodo: 0
    }
  },
  components: {
    SearchContainer,
    ProjectTableList
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onQuery (formName) {
      // 查询内容要排除空字段，否则会出现match的错误
      const qf = this.queryForm
      if (qf.projectName.length === 0 && qf.productVer.length === 0 && qf.status.length === 0) {
        this.dataProps = this.dataList
      } else {
        this.dataProps = this.dataList.filter(project => {
          return project.metadata.projectName !== null && project.metadata.projectName.match(qf.projectName) &&
            project.metadata.productVer !== null && project.metadata.productVer.match(qf.productVer) &&
            project.metadata.status !== null && project.metadata.status.match(qf.status)
        })
      }
    },
    doUploadCase (row) {
      this.$router.push({
        name: 'casesMaintain',
        params: { projectId: row.projectId }
      })
    },
    doUploadResult (row) {
      this.$router.push({
        name: 'testResult',
        params: { projectId: row.projectId, data: JSON.stringify(row) }
      })
    },
    viewCaseDetails (row) {
      this.$router.push(
        {
          name: 'caseDetailsView',
          params: { projectId: row.projectId }
        }
      )
    },
    viewProjectDetails (row) {
      this.$router.push(
        {
          name: 'projectDetails',
          params: { projectId: row.projectId, data: JSON.stringify(row) }
        }
      )
    },
    doIssueLicense (row) {},
    onCertificationDownLoad () {},
    viewCertification (row) {
      if (row.certificated === '已获得') {
        this.ctDialogForm = row
        this.certificationDialog = true
      } else {
        return false
      }
    },
    getData () {
      const data = { pageNum: 1, pageSize: 50, projectInfo: {} }
      getProjectData(data).then(res => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          this.$alert('账号超时，请重新登录！', '超时', {
            confirmButtonText: 'OK',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 200) {
          this.dataList = res.data.data.list
          this.dataProps = this.dataList
        } else {
          this.$message({ message: '数据获取失败', type: 'error' })
          console.log('数据获取失败', res.data.msg)
        }
      }).catch(err => {
        this.$message({ message: '网络请求异常，请稍后再试！', type: 'error' })
        console.log('网络请求异常', err)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
 .customControlBt {
   margin-bottom: 20px;
 }
</style>
