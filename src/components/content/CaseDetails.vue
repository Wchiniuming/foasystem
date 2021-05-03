<template>
  <div>
    <search-container v-if="search">
      <template v-slot:queryCd>
        <el-form :inline="true" :model="caseQueryForm" ref='caseQueryForm' class="caseQuery-form">
          <el-form-item label='用例名称' prop='useCaseName'>
            <el-input v-model="caseQueryForm.useCaseName" placeholder="用例名称" clearable class="queryItem"></el-input>
          </el-form-item>
          <el-form-item label='模块1' prop='module1'>
            <el-input v-model="caseQueryForm.module1" placeholder="模块1" clearable class="queryItem"></el-input>
          </el-form-item>
          <el-form-item label='模块2' prop='module2'>
            <el-input v-model="caseQueryForm.module2" placeholder="模块2" clearable class="queryItem"></el-input>
          </el-form-item>
          <el-form-item label='测试目的' prop='purpose'>
            <el-input v-model="caseQueryForm.purpose" placeholder="测试目的" clearable class="queryItem"></el-input>
          </el-form-item>
          <el-form-item label='预期结果' prop='expectResult'>
            <el-input v-model="caseQueryForm.expectResult" placeholder="预期结果" clearable class="queryItem"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon='el-icon-search' @click="onQuery">查询</el-button>
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
      :tableData='caseDataResource'
      :selectable='selectable'
      :controlType='controlType'
      @multiSelect='selectCases'
      @edit='caseEdit'
      @delete='caseDelete'
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
        module1: '',
        module2: '',
        purpose: '',
        expectResult: ''
      },
      selectedCases: []
    }
  },
  methods: {
    selectCases (selectedValue) {
      this.selectedCases = selectedValue
    },
    multiDownLoad () {
      this.$emit('multiDownLoad', this.selectedCases)
    },
    allDownLoad () {
      // 下载全量用例
      this.$emit('allDownLoad', this.caseDataResource)
    },
    multiDelete () {
      this.$emit('multiCaseDelete', this.selectedCases)
    },
    caseUpload () {},
    modelDownload () {},
    caseEdit (row) {
      this.$emit('doCaseEdit', row)
    },
    caseDelete (index, row) {
      this.$emit('doCaseDelete', index, row)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onQuery () {
      this.$emit('caseQuery', this.caseQueryForm)
    }
  }
}
</script>

<style scoped>
 .queryItem {
   width: 180px;
 }
</style>
