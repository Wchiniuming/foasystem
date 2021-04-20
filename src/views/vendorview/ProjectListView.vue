<template>
  <div>
    <search-container>
      <template v-slot:queryCd>
        <el-form :inline="true" :model="projQueryForm" :rules='rules' ref='projQueryForm' class="projQuery-form" style="width:100%">
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
  </div>
</template>

<script>
import SearchContainer from '@/components/common/SearchContainer.vue'
import TableList from '@/components/common/TableList.vue'

export default {
  data () {
    return {
      controlType: 'editAndDelete',
      projQueryForm: {
        projectName: '',
        targetSystem: '',
        projectState: '',
        beginDate: '',
        endDate: ''
      },
      rules: {
        beginDate: [
          { type: 'date', trigger: 'change' }
        ],
        endDate: [
          { type: 'date', trigger: 'change' }
        ]
      },
      tableHeadersProps: [
        {
          key: 'projectName',
          name: '测试项目'
        },
        {
          key: 'targetSystem',
          name: '测试系统'
        },
        {
          key: 'systemVersion',
          name: '版本'
        },
        {
          key: 'createdDateTime',
          name: '创建时间'
        },
        {
          key: 'projectState',
          name: '状态'
        },
        {
          key: 'caseNumber',
          name: '用例数'
        },
        {
          key: 'passingRate',
          name: '通过率'
        },
        {
          key: 'certificated',
          name: '入网许可'
        }
      ],
      projectData: [
        {
          projectName: '测试项目1',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目2',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2021/3/19 08:25:36',
          projectState: '已完成',
          caseNumber: 100,
          passingRate: '50%',
          certificated: '不合格'
        },
        {
          projectName: '测试项目3',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '申请失败',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目4',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '申请中',
          caseNumber: 100,
          passingRate: '80%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目5',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '测试中',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目6',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目7',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '申请中',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目8',
          targetSystem: 'BOSS',
          systemVersion: 'V1.2',
          createdDateTime: '2020/11/19 08:25:36',
          projectState: '测试中',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        }
      ],
      projectDataProps: []
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
      this.$refs[formName].validate(
        (valid) => {
          if (valid) {
            const pqf = this.projQueryForm
            console.log(pqf)
            if (Object.keys(pqf).length !== 0 && (pqf.beginDate === '' || pqf.beginDate === null) && (pqf.endDate === '' || pqf.endDate === null)) {
              this.projectDataProps = this.projectData
                .filter(project => {
                  return project.projectName.match(pqf.projectName) && project.targetSystem.match(pqf.targetSystem) && project.projectState.match(pqf.projectState)
                })
                // .filter(project => project.targetSystem.match(pqf.targetSystem))
                // .filter(project => project.projectState.match(pqf.projectState))
            } else if (Object.keys(pqf).length !== 0 && ((pqf.beginDate !== '' || pqf.beginDate != null) && (pqf.endDate !== '' || pqf.endDate != null))) {
              this.projectDataProps = this.projectData
                .filter(project => {
                  return project.projectName.match(pqf.projectName) && project.targetSystem.match(pqf.targetSystem) && project.projectState.match(pqf.projectState) && new Date(project.createdDateTime) >= new Date(pqf.beginDate) && new Date(project.createdDateTime) <= new Date(pqf.endDate)
                })
                // .filter(project => project.targetSystem.match(pqf.targetSystem))
                // .filter(project => project.projectState.match(pqf.projectState))
                // .filter(project => new Date(project.createdDateTime) >= new Date(pqf.beginDate) && new Date(project.createdDateTime) <= new Date(pqf.endDate))
            } else if (Object.keys(pqf).length !== 0 && ((pqf.beginDate !== '' || pqf.beginDate != null) || (pqf.endDate !== '' || pqf.endDate != null))) {
              this.projectDataProps = this.projectData
                .filter(project => {
                  return project.projectName.match(pqf.projectName) && project.targetSystem.match(pqf.targetSystem) && project.projectState.match(pqf.projectState) && (new Date(project.createdDateTime) >= new Date(pqf.beginDate) || new Date(project.createdDateTime) <= new Date(pqf.endDate))
                })
                // .filter(project => project.targetSystem.match(pqf.targetSystem))
                // .filter(project => project.projectState.match(pqf.projectState))
                // .filter(project => new Date(project.createdDateTime) >= new Date(pqf.beginDate) || new Date(project.createdDateTime) <= new Date(pqf.endDate))
            } else if (Object.keys(pqf).length !== 0 && pqf.beginDate == null && (pqf.endDate !== '' || pqf.endDate != null)) {
              this.projectDataProps = this.projectData
                .filter(project => {
                  return project.projectName.match(pqf.projectName) && project.targetSystem.match(pqf.targetSystem) && project.projectState.match(pqf.projectState) && new Date(project.createdDateTime) <= new Date(pqf.endDate)
                })
                // .filter(project => project.targetSystem.match(pqf.targetSystem))
                // .filter(project => project.projectState.match(pqf.projectState))
                // .filter(project => new Date(project.createdDateTime) >= new Date(pqf.beginDate) || new Date(project.createdDateTime) <= new Date(pqf.endDate))
            } else if (Object.keys(pqf).length !== 0 && (pqf.beginDate !== '' || pqf.beginDate != null) && pqf.endDate === null) {
              this.projectDataProps = this.projectData
                .filter(project => {
                  return project.projectName.match(pqf.projectName) && project.targetSystem.match(pqf.targetSystem) && project.projectState.match(pqf.projectState) && new Date(project.createdDateTime) >= new Date(pqf.beginDate)
                })
                // .filter(project => project.targetSystem.match(pqf.targetSystem))
                // .filter(project => project.projectState.match(pqf.projectState))
                // .filter(project => new Date(project.createdDateTime) >= new Date(pqf.beginDate) || new Date(project.createdDateTime) <= new Date(pqf.endDate))
              console.log('ssss')
            } else {
              this.projectDataProps = this.projectData
            }
          } else {
            return false;
          }
        }
      )
    },
    newProject () {
      this.$router.push({
        name: 'newproject'
      })
    },
    editProject (row) {
      console.log(row)
    },
    deleteProject (row) {
      console.log(row)
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
      console.log(row)
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
