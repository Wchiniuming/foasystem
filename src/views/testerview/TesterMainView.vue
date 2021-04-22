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
        <el-form :inline="true" :model="queryForm" ref='queryForm' style="width:100%">
          <el-col :span='20' style="width: 100%">
            <el-form-item label='项目名称' prop="projectName">
              <el-input v-model="queryForm.projectName" placeholder="项目名称" class='itemInput' clearable></el-input>
            </el-form-item>
            <el-form-item label='版本' prop="productName">
              <el-input v-model="queryForm.productName" placeholder="产品" class='itemInput' clearable></el-input>
            </el-form-item>
            <el-form-item label='状态' prop="status">
              <el-select v-model="queryForm.status" class='itemInput' placeholder="状态" clearable>
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
    <table-list
      :tableHeaders='tableHeaders'
      :tableData='dataList'
      :controlType='controlType'
      ></table-list>
  </div>
</template>

<script>
import SearchContainer from '@/components/common/SearchContainer'
import TableList from '@/components/common/TableList'
import { testMainViewHeaders } from '@/common/TableHeaders'

export default {
  name: 'TestMainView',
  data () {
    return {
      tableHeaders: testMainViewHeaders,
      dataList: [
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
          contactMan: '奥恩',
          principal: ['宋宝玉', '宋宝玉']
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
          contactMan: '奥恩',
          principal: ['宋宝玉', '游艺']
        }
      ],
      controlType: 'upload',
      queryForm: {
        projectName: '',
        productName: '',
        status: ''
      },
      numOfTodo: 0
    }
  },
  components: {
    SearchContainer,
    TableList
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onQuery (formName) {}
  }
}
</script>

<style scoped>
 .customControlBt {
   margin-bottom: 20px;
   margin-top: -12px;
 }
</style>
