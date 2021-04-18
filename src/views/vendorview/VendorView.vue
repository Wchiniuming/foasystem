<template>
  <search-container>
    <template v-slot:querycd>
      <div class="queryitem" ref="项目名称">
        <label for="项目名称">项目名称</label>
        <el-input name='项目名称' placeholder='项目名称'></el-input>
      </div>
      <div class="queryitem" ref="类型">
        <label for="类型">类型</label>
        <el-input name='类型' placeholder='类型'></el-input>
      </div>
      <div class="queryitem" ref="状态">
        <label for="状态">状态</label>
        <el-input name='状态' placeholder='状态'></el-input>
      </div>
      <div class="queryitem" ref="创建时间">
        <label for="创建时间">创建时间</label>
        <el-input name='开始时间' placeholder='开始时间'></el-input>
        <span> - </span>
        <el-input name='结束时间' placeholder='结束时间'></el-input>
      </div>
      <div class="querybutton">
        <el-button>查询</el-button>
      </div>
    </template>
  </search-container>
  <el-table :data='projectData' style='width: 100%'>
    <el-table-column :label='tableHeaders.projectName'>
      <template #default='scope'>
        <span>{{ scope.row.projectName}}</span>
      </template>
    </el-table-column>
    <el-table-column :label='tableHeaders.version'>
      <template #default='scope'>
        <span>{{ scope.row.version}}</span>
      </template>
    </el-table-column>
    <el-table-column :label='tableHeaders.type'>
      <template #default='scope'>
        <span>{{ scope.row.type}}</span>
      </template>
    </el-table-column>
    <el-table-column :label='tableHeaders.createTime' width="160px">
      <template #default='scope'>
        <span>{{ scope.row.createTime}}</span>
      </template>
    </el-table-column>
    <el-table-column :label='tableHeaders.state'>
      <template #default='scope'>
        <span>{{ scope.row.state}}</span>
      </template>
    </el-table-column>
    <el-table-column :label='tableHeaders.caseNumber'>
      <template #default='scope'>
        <span>{{ scope.row.caseNumber}}</span>
      </template>
    </el-table-column>
    <el-table-column :label='tableHeaders.passingrate'>
      <template #default='scope'>
        <span>{{ scope.row.passingrate}}</span>
      </template>
    </el-table-column>
    <el-table-column :label='tableHeaders.certificated'>
      <template #default='scope'>
        <span>{{ scope.row.certificated}}</span>
      </template>
    </el-table-column>
    <el-table-column label='操作'>
      <template #default='scope'>
        <el-button size='mini' @click='handleEdit(scope.$index, scope.row)'
          >编辑</el-button>
        <el-button
          size='mini'
          type='danger'
          @click='handleDelete(scope.row)'
          >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import SearchContainer from '@/components/common/searchcontainer/SearchContainer'
import SearchContainer from '../../components/common/SearchContainer.vue'

export default {
  data () {
    return {
      tableHeaders: {
        projectName: '测试项目',
        version: '版本',
        type: '类型',
        createTime: '创建时间',
        state: '状态',
        caseNumber: '用例数',
        passingrate: '通过率',
        certificated: '入网许可'
      },
      projectData: [
        {
          projectName: '测试项目1',
          version: 'V1.2',
          type: '功能测试',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingrate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目2',
          version: 'V1.2',
          type: '技术验证',
          createTime: '2021/3/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingrate: '50%',
          certificated: '不合格'
        },
        {
          projectName: '测试项目3',
          version: 'V1.2',
          type: '流程管理',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingrate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目4',
          version: 'V1.2',
          type: '性能评估',
          createTime: '2020/11/19 08:25:36',
          state: '申请中',
          caseNumber: 100,
          passingrate: '80%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目5',
          version: 'V1.2',
          type: '性能评估',
          createTime: '2020/11/19 08:25:36',
          state: '测试中',
          caseNumber: 100,
          passingrate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目6',
          version: 'V1.2',
          type: '系统建设',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingrate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目7',
          version: 'V1.2',
          type: '功能测试',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingrate: '100%',
          certificated: '已获得'
        },
        {
          projectName: '测试项目8',
          version: 'V1.2',
          type: '功能测试',
          createTime: '2020/11/19 08:25:36',
          state: '已完成',
          caseNumber: 100,
          passingrate: '100%',
          certificated: '已获得'
        }
      ]
    }
  },
  components: {
    SearchContainer
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (scope) {
      console.log(scope)
    }
  }
};
</script>

<style scoped>
  .queryitem {
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
  }
  label {
    width: 50%;
  }
  el-table-column {
    flex: 1;
  }
  .querybutton {
    width: 20%;
    margin-left: 50px;
  }
</style>
