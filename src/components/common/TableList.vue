<template>
  <div>
    <el-table stripe ref="multipleTable" :data='tableData' @selection-change="handleSelectionChange" style='width: 100%'>
      <el-table-column
        type="selection"
        width="55"
        v-if='selectable'>
      </el-table-column>
      <el-table-column v-for='item in tableHeaders' :label='item.name' :key='item.key'>
        <template #default='scope'>
          <a v-if="[item.key]=='projectName'" @click='handleProView(scope.row)'>{{scope.row.[item.key]}}</a>
          <a v-else-if="[item.key]=='caseNumber'" @click='handleCaseView(scope.row)'>{{scope.row.[item.key]}}</a>
          <a v-else-if="[item.key]=='passingRate'" @click='handlePassingView(scope.row)'>{{scope.row.[item.key]}}</a>
          <a
            v-else-if="[item.key]=='certificated'"
            @click='handleCertificatedView(scope.row)'
            :class="{'font-red': scope.row.[item.key]=='不合格'}">
            {{scope.row.[item.key]}}</a>
          <span v-else>{{scope.row.[item.key]}}</span>
        </template>
      </el-table-column>
      <el-table-column label='操作' v-if="controlType=='editAndDelete'">
        <template #default='scope'>
          <el-button
            size='mini'
            type='primary'
            @click='handleEdit(scope.row)'
            :disabled="scope.row.projectState=='已完成'||scope.row.projectState=='测试中'"
            >编辑</el-button>
          <el-button
            size='mini'
            type='danger'
            @click='handleDelete(scope.row)'
            :disabled="scope.row.projectState=='已完成'||scope.row.projectState=='测试中'"
            >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label='操作' v-else-if="controlType=='viewAndApprove'">
        <template #default='scope'>
          <el-button
            size='mini'
            type='primary'
            @click='handleView(scope.row)'
          >查看</el-button>
          <el-button
            size='mini'
            type='danger'
            @click='handleApprove(scope.row)'
            >审批</el-button>
        </template>
      </el-table-column>
      <el-table-column label='操作' v-else-if="controlType=='upload'">
        <template #default='scope'>
          <el-button
            size='mini'
            type='primary'
            @click='handleUploadCase(scope.row)'
          >上传用例</el-button>
          <el-button
            size='mini'
            type='danger'
            @click='handleUploadResult(scope.row)'
            >上传结果</el-button>
          <el-button
            size='mini'
            type='primary'
            @click='handleIssueLicense(scope.row)'
            >颁发许可</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableList',
  props: {
    tableData: Array,
    tableHeaders: Array,
    controlType: String,
    selectable: Boolean
  },
  methods: {
    // 编辑和删除
    handleEdit (row) {
      this.$emit('edit', row)
    },
    handleDelete (row) {
      this.$emit('delete', row)
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
