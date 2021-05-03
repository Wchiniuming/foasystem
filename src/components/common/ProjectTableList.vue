<template>
  <div>
    <el-table stripe ref="multipleTable" :default-sort="sortRules" :data='tableData' @selection-change="handleSelectionChange" style='width: 100%'>
      <el-table-column
        type="selection"
        width="55"
        v-if='selectable'>
      </el-table-column>
      <el-table-column v-for='item in tableHeaders' :prop="item.key" :sortable="sortable(item.key)" :width="comWidth(item.name)" :label='item.name' :key='item.key'>
        <template #default='scope'>
          <a v-if="[item.key]=='projectName' && nameCl==true" @click='handleProView(scope.row.metadata)'>{{scope.row.metadata.[item.key]}}</a>
          <a v-else-if="[item.key]=='numOfCase' && caseNumCl==true" @click='handleCaseView(scope.row.metadata)'>{{scope.row.statistic.[item.key]}}</a>
          <span v-else-if="[item.key]=='numOfCase' && caseNumCl==false">{{scope.row.statistic.[item.key]}}</span>
          <a v-else-if="[item.key]=='passRate' && passRCl==true" @click='handlePassingView(scope.row.metadata)'>{{scope.row.statistic.[item.key]}}</a>
          <span v-else-if="[item.key]=='passRate' && passRCl==false">{{scope.row.statistic.[item.key]}}</span>
          <a v-else-if="[item.key]=='certificated' && certifyCl==true"
            @click='handleCertificatedView(scope.row.metadata)'
            :class="{'font-red': scope.row.metadata.[item.key]=='不合格'}"
            >{{scope.row.metadata.[item.key]}}</a>
          <span v-else-if="item.type===Array">
            <span v-for="value in scope.row.metadata.[item.key]" :key='value'>
              {{value}}&nbsp;
            </span>
          </span>
          <span v-else>{{scope.row.metadata.[item.key]}}</span>
        </template>
      </el-table-column>
      <el-table-column label='操作' v-if="controlType=='editAndDelete'" width="150">
        <template #default='scope'>
          <el-button
            size='mini'
            type='primary'
            @click='handleEdit(scope.row.metadata)'
            :disabled="scope.row.metadata.status=='已完成'||scope.row.metadata.status=='测试中'"
            >编辑</el-button>
          <el-button
            size='mini'
            type='danger'
            @click='handleDelete(scope.$index, scope.row.metadata)'
            :disabled="scope.row.metadata.status=='已完成'||scope.row.metadata.status=='测试中'"
            >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label='操作' v-else-if="controlType=='viewAndApprove'" width="150">
        <template #default='scope'>
          <el-button
            size='mini'
            type='primary'
            @click='handleView(scope.row.metadata)'
            >查看</el-button>
          <el-button
            size='mini'
            type='danger'
            @click='handleApprove(scope.row.metadata)'
            >审批</el-button>
        </template>
      </el-table-column>
      <el-table-column label='操作' v-else-if="controlType=='upload'" width="250">
        <template #default='scope'>
          <el-button
            size='mini'
            type='primary'
            plain
            @click='handleUploadCase(scope.row.metadata)'
            >传用例</el-button>
          <el-button
            size='mini'
            type='primary'
            @click='handleUploadResult(scope.row.metadata)'
            >传结果</el-button>
          <el-button
            size='mini'
            type='success'
            @click='handleIssueLicense(scope.row.metadata)'
            >发许可</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ProjectTableList',
  data () {
    return {
      sortRules: [
        { prop: 'passRate', order: 'descending' },
        { prop: 'createTime' },
        { prop: 'finishedTime' },
        { prop: 'numOfCase' }
      ]
    }
  },
  props: {
    tableData: Array,
    tableHeaders: Array,
    controlType: String,
    selectable: Boolean,
    nameCl: {
      type: Boolean,
      default: true
    },
    caseNumCl: {
      type: Boolean,
      default: true
    },
    passRCl: {
      type: Boolean,
      default: true
    },
    certifyCl: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    sortable (key) {
      return key === 'createTime' || key === 'finishedTime' || key === 'numOfCase' || key === 'passRate'
    },
    comWidth (name) {
      if (name.match('时间')) {
        return 180
      }
    },
    // 编辑和删除
    handleEdit (row) {
      this.$emit('edit', row)
    },
    handleDelete (index, row) {
      this.$emit('delete', index, row)
    },
    // 查看和审批
    handleView (row) {
      this.$emit('view', row)
    },
    handleApprove (row) {
      this.$emit('approve', row)
    },
    // 上传和颁发许可
    handleUploadCase (row) {
      this.$emit('uploadCase', row)
    },
    handleUploadResult (row) {
      this.$emit('uploadResult', row)
    },
    handleIssueLicense (row) {
      this.$emit('issueLicense', row)
    },
    // 行中的操作功能
    handleProView (row) {
      this.$emit('projectView', row)
    },
    handleCaseView (row) {
      this.$emit('caseView', row)
    },
    handlePassingView (row) {
      this.$emit('passingView', row)
    },
    handleCertificatedView (row) {
      this.$emit('certificatedView', row)
    },
    handleSelectionChange (selectedValue) {
      this.$emit('multiSelect', selectedValue)
    }
  }
}
</script>

<style scoped>
  el-table-column {
    flex: 1;
  }
  a {
    border-bottom: 1px solid gray;
  }
  a:hover {
    cursor: pointer;
  }
  .font-red {
    color: red;
  }
</style>
