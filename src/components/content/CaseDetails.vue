<template>
  <div>
    <search-container v-if="search">
      <template v-slot:queryCd>
        <el-form :inline="true" :model="caseQueryForm" ref='caseQueryForm' class="caseQuery-form">
          <el-form-item label='用例名称' prop='useCaseName'>
            <el-input v-model="caseQueryForm.useCaseName" placeholder="用例名称" clearable></el-input>
          </el-form-item>
          <el-form-item label='测试人员' prop='testMan'>
            <el-input v-model="caseQueryForm.testMan" placeholder="测试人员" clearable></el-input>
          </el-form-item>
          <el-form-item label='测试日期' prop='testTime'>
             <el-date-picker
                  v-model='caseQueryForm.testTime'
                  type='date'
                  placeholder='测试日期'
                  >
                </el-date-picker>
          </el-form-item>
          <el-form-item label='测试结果' prop='result'>
            <el-input v-model="caseQueryForm.result" placeholder="测试结果" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon='el-icon-search' @click="onQuery('caseQueryForm')">查询</el-button>
            <el-button type="info" small icon='el-icon-refresh' @click="resetForm('caseQueryForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </search-container>
    <div class="downLoadBt">
      <el-col :span='20' style="width: 100%">
        <el-button type='text' @click="multiDownLoad" v-if="multiDownL">批量下载</el-button>
        <el-button type='text' @click="multiDelete" v-if="multiDel">批量删除</el-button>
        <el-button type='text' @click="allDownLoad" v-if="allDownL">下载全部用例</el-button>
      </el-col>
      <el-col :span='4' style="width: 100%; display: flex; flex-direction: row; justify-content: end;">
        <el-button type='primary' plain @click="caseUpload" v-if="caseUpl">导入测试用例</el-button>
        <el-button type='primary' plain @click="modelDownload" v-if="modelDl">用例模板下载</el-button>
      </el-col>
    </div>
    <table-list
      :tableHeaders='tableHeadersProps'
      :tableData='casesProps'
      :selectable='selectable'
      :controlType='controlType'
      @multiSelect='selectCases'
    ></table-list>
  </div>
</template>

<script>
import SearchContainer from '@/components/common/SearchContainer'
import TableList from '@/components/common/TableList'
import { CaseDetailsHeader } from '@/common/TableHeaders'

export default {
  name: 'CaseDetails',
  components: {
    SearchContainer,
    TableList
  },
  props: {
    search: Boolean,
    tableHeadersProps: {
      default: CaseDetailsHeader,
      type: Array
    },
    selectable: {
      default: true,
      type: Boolean
    },
    caseDataResource: Array,
    controlType: String,
    multiDownL: {
      default: false,
      type: Boolean
    },
    multiDel: {
      default: false,
      type: Boolean
    },
    allDownL: {
      default: false,
      type: Boolean
    },
    caseUpl: {
      default: false,
      type: Boolean
    },
    modelDl: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      caseQueryForm: {
        useCaseName: '',
        testMan: '',
        testTime: '',
        result: ''
      },
      selectedCases: [],
      casesProps: []
    }
  },
  methods: {
    selectCases (selectedValue) {
      this.selectCases = selectedValue
    },
    multiDownLoad () {
      this.$emit('multiDownLoad', this.selectCases)
    },
    allDownLoad () {
      // 下载全量用例
      this.$emit('allDownLoad', this.caseDataResource)
    },
    multiDelete () {},
    caseUpload () {},
    modelDownload () {},
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onQuery (formName) {
      const qf = this.caseQueryForm
      if (qf.useCaseName.length === 0 && qf.testMan.length === 0 && qf.result.length === 0 && (qf.testTime === null || qf.testTime.length === 0)) {
        this.casesProps = this.caseDataResource
      } else if ((qf.testTime !== null && qf.testTime.length !== 0)) {
        this.casesProps = this.caseDataResource.filter(
          casesItem => {
            return casesItem.useCaseName.match(qf.useCaseName) &&
            casesItem.testMan.match(qf.testMan) &&
            casesItem.testTime.match(qf.testTime) &&
            casesItem.result.match(qf.result)
          }
        )
      } else if ((qf.testTime === null || qf.testTime.length === 0)) {
        this.casesProps = this.caseDataResource.filter(
          casesItem => {
            return casesItem.useCaseName.match(qf.useCaseName) &&
            casesItem.testMan.match(qf.testMan) &&
            casesItem.result.match(qf.result)
          }
        )
      }
    }
  },
  created () {
    // 备份全量数据，用于查询
    this.casesProps = this.caseDataResource
  }
}
</script>

<style scoped>

</style>
