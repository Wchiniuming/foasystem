<template>
  <div>
    <search-container>
      <template v-slot:queryCd>
        <el-form :inline="true" :model="projQueryForm" ref='projQueryForm' class="projQuery-form" style="width:100%">
          <el-col :span='22' style="width: 100%">
            <el-col :span='12'>
              <el-form-item label='项目名称'>
                <el-input v-model="projQueryForm.projectName" placeholder="项目名称" class='itemInput' clearable></el-input>
              </el-form-item>
              <el-form-item label='系统'>
                <el-input v-model="projQueryForm.targetSystem" placeholder="测试系统" class='itemInput' clearable></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="projQueryForm.projectState" class='itemInput' placeholder="状态" clearable>
                  <el-option label="已完成" value="已完成"></el-option>
                  <el-option label="申请中" value="申请中"></el-option>
                  <el-option label="申请失败" value="申请失败"></el-option>
                  <el-option label="测试中" value="测试中"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='10' style="width: 100%">
              <el-form-item label='创建时间'>
                <el-date-picker
                  v-model='projQueryForm.beginDate'
                  type='date'
                  placeholder='创建时间'
                  >
                </el-date-picker>
                <span>-</span>
                <el-date-picker
                  v-model='projQueryForm.endDate'
                  type='date'
                  placeholder='结束时间'
                  >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span='2' style="width: 100%">
            <el-form-item class='queryBt'>
              <el-button type="primary" small icon='el-icon-search' @click="onQuery('projQueryForm')">查询</el-button>
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
          <el-form-item label="测试系统" prop="targetSystem">
            <el-col :span='8'>
              <el-input v-model="projectEditingForm.targetSystem" placeholder='测试系统'></el-input>
            </el-col>
            <el-col :span='16'>
              <el-form-item label="版本" prop="systemVersion">
                <el-input v-model="projectEditingForm.systemVersion" placeholder='系统版本'></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="系统开发商" prop="systemDeveloper">
            <el-input v-model="projectEditingForm.systemDeveloper" placeholder='系统开发商' style="width: 42%"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="projectState">
            <el-select v-model="projectEditingForm.projectState" placeholder="项目状态">
              <el-option label="测试中" value="测试中"></el-option>
              <el-option label="已申请" value="已申请"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计完成时间" prop="expectedDate">
            <el-date-picker type="date" placeholder="预计完成时间" v-model="projectEditingForm.expectedDate" style="width: 42%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="紧急度" prop="emergencyLevel">
            <el-input v-model="projectEditingForm.emergencyLevel" placeholder='紧急度' style="width: 42%"></el-input>
          </el-form-item>
          <el-form-item label="入网许可" prop="certificated">
            <el-select v-model="projectEditingForm.certificated" placeholder="入网许可">
              <el-option label="已获得" value="已获得"></el-option>
              <el-option label="不合格" value="不合格"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目描述" prop="projectDesc" style="width: 100%">
            <el-input type="textarea" placeholder='项目描述' :autosize='{minRows: 5, maxRows: 10}' v-model="projectEditingForm.projectDesc" style="width: 100%"></el-input>
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

export default {
  data () {
    return {
      controlType: 'editAndDelete',
      projectDataProps: [],
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
        targetSystem: '',
        projectState: '',
        beginDate: '',
        endDate: ''
      },
      tableHeadersProps: [],
      // 需要从接口获取的元数据信息
      projectData: [
        {
          projectName: '测试项目1',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得',
          systemDeveloper: '华为',
          projectDesc: '',
          emergencyLevel: '',
          expectedDate: ''
        },
        {
          projectName: '测试项目2',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2021/3/19 08:25:36',
          projectState: '已完成',
          caseNumber: 100,
          passingRate: '50%',
          certificated: '不合格',
          systemDeveloper: '华为',
          projectDesc: '',
          emergencyLevel: '',
          expectedDate: ''
        },
        {
          projectName: '测试项目3',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '申请失败',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得',
          systemDeveloper: '华为',
          projectDesc: '',
          emergencyLevel: '',
          expectedDate: ''
        },
        {
          projectName: '测试项目4',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '申请中',
          caseNumber: 100,
          passingRate: '80%',
          certificated: '不合格',
          systemDeveloper: '思特奇',
          projectDesc: '',
          emergencyLevel: '',
          expectedDate: ''
        },
        {
          projectName: '测试项目5',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '测试中',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得',
          systemDeveloper: '亚信',
          projectDesc: '',
          emergencyLevel: '',
          expectedDate: ''
        },
        {
          projectName: '测试项目6',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得',
          systemDeveloper: '亚信',
          projectDesc: '',
          emergencyLevel: '',
          expectedDate: ''
        },
        {
          projectName: '测试项目7',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '申请中',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得',
          systemDeveloper: '亚信',
          projectDesc: '',
          emergencyLevel: '',
          expectedDate: ''
        },
        {
          projectName: '测试项目8',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '测试中',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得',
          systemDeveloper: '亚信',
          projectDesc: '',
          emergencyLevel: '',
          expectedDate: ''
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
    this.tableHeadersProps = projectListTableHeader
    this.editRules = projectEditFormRules
  },
  methods: {
    onQuery (formName) {
      const pqf = this.projQueryForm
      // 需要先判断是否为null，再判断长度是否为0
      const notNull = pqf.projectName.length === 0 && pqf.targetSystem.length === 0 && pqf.projectState.length === 0 && (pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate === null || pqf.endDate.length === 0)
      if (notNull) {
        this.projectDataProps = this.projectData
      } else if ((pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate === null || pqf.endDate.length === 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.targetSystem.match(pqf.targetSystem) &&
            project.projectState.match(pqf.projectState)
          })
      } else if (((pqf.beginDate !== null && pqf.beginDate.length !== 0) && (pqf.endDate !== null && pqf.endDate.length !== 0))) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.targetSystem.match(pqf.targetSystem) &&
            project.projectState.match(pqf.projectState) &&
            new Date(project.createdDateTime) >= new Date(pqf.beginDate) &&
            new Date(project.createdDateTime) <= new Date(pqf.endDate)
          })
      } else if ((pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate !== null || pqf.endDate.length !== 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.targetSystem.match(pqf.targetSystem) &&
            project.projectState.match(pqf.projectState) &&
            new Date(project.createdDateTime) <= new Date(pqf.endDate)
          })
      } else if ((pqf.beginDate !== null && pqf.beginDate.length !== 0) && (pqf.endDate === null || pqf.endDate.length === 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.projectName.match(pqf.projectName) &&
            project.targetSystem.match(pqf.targetSystem) &&
            project.projectState.match(pqf.projectState) &&
            new Date(project.createdDateTime) >= new Date(pqf.beginDate)
          })
      } else {
        this.projectDataProps = this.projectData
      }
    },
    newProject () {
      this.$router.push({
        name: 'newproject'
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
          name: 'projectdetails',
          params: { projName: row.projectName }
        }
      )
    },
    viewCaseDetails (row) {
      this.$router.push(
        {
          name: 'casedetails',
          params: { projName: row.projectName }
        }
      )
    },
    viewTestResult (row) {
      console.log(row)
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
