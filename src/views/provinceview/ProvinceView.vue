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
              <el-input v-model="projQueryForm.projectName" placeholder="项目名称" class='itemInput' clearable></el-input>
            </el-form-item>
            <el-form-item label='产品' prop='productName'>
              <el-input v-model="projQueryForm.productName" placeholder="产品" class='itemInput' clearable></el-input>
            </el-form-item>
            <el-form-item label='版本' prop='productVer'>
              <el-input v-model="projQueryForm.productVer" placeholder="版本" class='itemInput' clearable></el-input>
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
    <table-list
      :nameCl='false'
      :passRCl='false'
      :tableHeaders='tableHeadersProps'
      :tableData='projectDataProps'
      @caseView='viewCaseDetails'
      @certificatedView='viewCertification'
      >
    </table-list>
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
import { provinceProjectListTableHeader } from '@/common/TableHeaders'

export default {
  name: 'ProvinceView',
  data () {
    return {
      projectDataProps: [],
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
      },
      // 需要从接口获取的元数据信息
      projectData: [
        {
          projectName: '测试项目1',
          productName: 'BOSS',
          productVer: 'V1.2',
          createTime: '2020/11/19 08:25:36',
          status: '已完成',
          numOfCase: 100,
          passRate: '100%',
          certificated: '已获得',
          company: '华为',
          description: '紧急',
          projectLevel: '紧急',
          finishedTime: '2020/11/19 08:25:36',
          contactMan: '奥恩'
        },
        {
          projectName: '测试项目2',
          productName: 'BOSS',
          productVer: 'V1.2',
          createTime: '2021/3/19 08:25:36',
          status: '已完成',
          numOfCase: 100,
          passRate: '50%',
          certificated: '不合格',
          company: '华为',
          description: '紧急',
          projectLevel: '紧急',
          finishedTime: '2020/11/19 08:25:36',
          contactMan: '奥恩'
        },
        {
          projectName: '测试项目3',
          productName: 'BOSS',
          productVer: 'V1.2',
          createTime: '2020/11/19 08:25:36',
          status: '申请失败',
          numOfCase: 100,
          passRate: '100%',
          certificated: '已获得',
          company: '华为',
          description: '紧急',
          projectLevel: '紧急',
          finishedTime: '2020/11/19 08:25:36',
          contactMan: '奥恩'
        },
        {
          projectName: '测试项目4',
          productName: 'BOSS',
          productVer: 'V1.2',
          createTime: '2020/11/19 08:25:36',
          status: '申请中',
          numOfCase: 100,
          passRate: '80%',
          certificated: '不合格',
          company: '思特奇',
          description: '紧急',
          projectLevel: '紧急',
          finishedTime: '2020/11/19 08:25:36',
          contactMan: '奥恩'
        },
        {
          projectName: '测试项目5',
          productName: 'BOSS',
          productVer: 'V1.2',
          createTime: '2020/11/19 08:25:36',
          status: '测试中',
          numOfCase: 100,
          passRate: '100%',
          certificated: '已获得',
          company: '亚信',
          description: '紧急',
          projectLevel: '紧急',
          finishedTime: '2020/11/19 08:25:36',
          contactMan: '奥恩'
        },
        {
          projectName: '测试项目6',
          productName: 'BOSS',
          productVer: 'V1.2',
          createTime: '2020/11/19 08:25:36',
          status: '已完成',
          numOfCase: 100,
          passRate: '100%',
          certificated: '已获得',
          company: '亚信',
          description: '紧急',
          projectLevel: '紧急',
          finishedTime: '2020/11/19 08:25:36',
          contactMan: '奥恩'
        },
        {
          projectName: '测试项目7',
          productName: 'BOSS',
          productVer: 'V1.2',
          createTime: '2020/11/19 08:25:36',
          status: '申请中',
          numOfCase: 100,
          passRate: '100%',
          certificated: '已获得',
          company: '亚信',
          description: '紧急',
          projectLevel: '紧急',
          finishedTime: '2020/11/19 08:25:36',
          contactMan: '奥恩'
        },
        {
          projectName: '测试项目8',
          productName: 'BOSS',
          productVer: 'V1.2',
          createTime: '2020/11/19 08:25:36',
          status: '测试中',
          numOfCase: 100,
          passRate: '100%',
          certificated: '已获得',
          company: '亚信',
          description: '紧急',
          projectLevel: '紧急',
          finishedTime: '2020/11/19 08:25:36',
          contactMan: '奥恩'
        }
      ]
    }
  },
  components: {
    SearchContainer,
    TableList
  },
  created () {
    this.projectDataProps = this.projectData
  },
  methods: {
    onQuery (formName) {
      const pqf = this.projQueryForm
      const notNull = pqf.projectName.length === 0 && pqf.productName.length === 0 && pqf.status.length === 0 && pqf.productVer.length === 0
      if (notNull) {
        this.projectDataProps = this.projectData
      } else {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.productName.match(pqf.productName) &&
            project.status.match(pqf.status) &&
            project.productVer.match(pqf.productVer)
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
          params: { projectName: row.projectName }
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
  .stat-Analysis {
    margin-bottom: 20px;
  }
</style>
