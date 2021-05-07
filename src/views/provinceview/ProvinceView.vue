<template>
  <div>
    <div class="stat-Analysis">
      <el-button type="primary" plain icon='el-icon-s-data' @click="statisticalAnalysis('caseQueryForm')">统计</el-button>
    </div>
    <search-container>
      <template v-slot:queryCd>
        <el-form :inline="true" :model="projQueryForm" ref='projQueryForm' class="projQuery-form" style="width:100%">
          <el-col :span='20' style="width: 100%">
            <el-form-item label='项目名称' prop='projectName'>
              <el-input v-model.trim="projQueryForm.projectName" placeholder="项目名称" class='itemInput' clearable></el-input>
            </el-form-item>
            <el-form-item label='产品' prop='productName'>
              <el-input v-model.trim="projQueryForm.productName" placeholder="产品" class='itemInput' clearable></el-input>
            </el-form-item>
            <el-form-item label='版本' prop='productVer'>
              <el-input v-model.trim="projQueryForm.productVer" placeholder="版本" class='itemInput' clearable></el-input>
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
          <el-col :span='4' style="width: 100%">
            <el-form-item class='queryBt'>
              <el-button type="primary" small icon='el-icon-search' @click="onQuery('projQueryForm')">查询</el-button>
              <el-button type="info" small icon='el-icon-refresh' @click="resetForm('projQueryForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </template>
    </search-container>
    <project-table-list
      :nameCl='false'
      :passRCl='false'
      :tableHeaders='tableHeadersProps'
      :tableData='projectDataProps'
      @caseView='viewCaseDetails'
      @certificatedView='viewCertification'
      >
    </project-table-list>
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
import { provinceProjectListTableHeader } from '@/common/TableHeaders'
import { getProjectData } from '@/api/getData'

export default {
  name: 'ProvinceView',
  data () {
    return {
      projectDataProps: [],
      projectDataBackup: [],
      // 证书查看页面
      ctDialogForm: {},
      certificationDialog: false,
      // 编辑窗口的属性信息
      tableHeadersProps: provinceProjectListTableHeader,
      // 查询窗口的属性信息
      projQueryForm: {
        projectName: '',
        productName: '',
        status: '',
        productVer: ''
      }
    }
  },
  components: {
    SearchContainer,
    ProjectTableList
  },
  methods: {
    getData () {
      const data = { pageNum: 1, pageSize: 20, projectInfo: {} }
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
          this.projectDataProps = res.data.data.list
          this.projectDataBackup = this.projectDataProps
        } else {
          this.$message({ message: '数据请求失败', type: 'error' })
          console.log('数据请求失败', res)
        }
      }).catch(err => {
        this.$message({ message: '网络请求异常，请稍后再试！', type: 'error' })
        console.log('网络请求异常', err)
      })
    },
    onQuery (formName) {
      const pqf = this.projQueryForm
      const notNull = pqf.projectName.length === 0 && pqf.productName.length === 0 && pqf.status.length === 0 && pqf.productVer.length === 0
      if (notNull) {
        this.projectDataProps = this.projectDataBackup
      } else {
        this.projectDataProps = this.projectDataBackup
          .filter(project => {
            return project.metadata.projectName.match(pqf.projectName) &&
            project.metadata.productName.match(pqf.productName) &&
            project.metadata.status.match(pqf.status) &&
            project.metadata.productVer.match(pqf.productVer)
          })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    viewCaseDetails (row) {
      this.$router.push(
        {
          name: 'caseDetailsView',
          params: { projectId: row.projectId }
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
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
  .stat-Analysis {
    margin-bottom: 20px;
  }
</style>
