<template>
  <search-container>
    <template v-slot:queryCd>
      <el-form :inline="true" :model="projQueryForm" :rules='rules' ref='projQueryForm' class="projQuery-form">
        <el-form-item label='项目名称'>
          <el-input v-model="projQueryForm.projectName" placeholder="项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label='类型'>
          <el-input v-model="projQueryForm.projectType" placeholder="类型" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="projQueryForm.projectState" placeholder="状态">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="申请中" value="申请中"></el-option>
            <el-option label="测试中" value="测试中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-date-picker
            v-model='projQueryForm.beginDate'
            type='date'
            placeholder='创建时间'>
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            v-model='projQueryForm.endDate'
            type='date'
            placeholder='结束时间'>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon='el-icon-search' @click="onQuery('projQueryForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
  </search-container>
  <div class='newprojectbt'>
    <el-button type='primary' @click='newProject' plain>新建</el-button>
  </div>
  <table-list
    :tableHeaders='tableHeadersProps'
    :tableData='projectData'
    :controlType='controlType'
    :selectable='false'
    @edit='editProject'
    @delete='deleteProject'
    @projectView='viewProjectInfo'
    @caseView='viewCaseDetails'
    @passingView='viewTestResult'
    @certificatedView='viewCertification'
    >
  </table-list>
</template>

<script>
import SearchContainer from '../../components/common/SearchContainer.vue'
import TableList from '../../components/common/TableList.vue'

export default {
  data () {
    return {
      controlType: 'editAndDelete',
      projQueryForm: {
        projectName: '',
        projectType: '',
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
          key: 'version',
          name: '版本'
        },
        {
          key: 'type',
          name: '类型'
        },
        {
          key: 'createTime',
          name: '创建时间'
        },
        {
          key: 'state',
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
          version: 'V1.2',
          type: '功能测试',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目2',
          version: 'V1.2',
          type: '技术验证',
          createTime: '2021/3/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingRate: '50%',
          certificated: '不合格'
        },
        {
          projectName: '测试项目3',
          version: 'V1.2',
          type: '流程管理',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目4',
          version: 'V1.2',
          type: '性能评估',
          createTime: '2020/11/19 08:25:36',
          state: '申请中',
          caseNumber: 100,
          passingRate: '80%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目5',
          version: 'V1.2',
          type: '性能评估',
          createTime: '2020/11/19 08:25:36',
          state: '测试中',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目6',
          version: 'V1.2',
          type: '系统建设',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目7',
          version: 'V1.2',
          type: '功能测试',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目8',
          version: 'V1.2',
          type: '功能测试',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingRate: '100%',
          certificated: '已获得'
        }
      ]
    }
  },
  components: {
    SearchContainer,
    TableList
  },
  methods: {
    onQuery (formName) {
      this.$refs[formName].validate(
        (valid) => {
          if (valid) {
            console.log(this.projQueryForm)
          } else {
            alert('error');
            return false;
          }
        }
      )
    },
    newProject () {
      this.$router.push('/vendor/newproject')
    },
    editProject (row) {
      console.log(row)
    },
    deleteProject (row) {
      console.log(row)
    },
    viewProjectInfo (row) {
      console.log(row)
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
  .queryitem {
    display: flex;
    flex: 1;
    flex-direction: row;
    text-align: center;
    align-items: center;
  }
  .queryitem, .datetime {
    width: 540px;
  }
  label {
    width: 50%;
  }
  .datetimelabel {
    width: 25%;
  }
  .querybt {
    width: 15%;
    margin-left: 50px;
  }
  .newprojectbt {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
