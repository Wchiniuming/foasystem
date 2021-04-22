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
          <a v-else-if="[item.key]=='numOfCase'" @click='handleCaseView(scope.row)'>{{scope.row.[item.key]}}</a>
          <a v-else-if="[item.key]=='passRate'" @click='handlePassingView(scope.row)'>{{scope.row.[item.key]}}</a>
          <a v-else-if="[item.key]=='certificated'"
            @click='handleCertificatedView(scope.row)'
            :class="{'font-red': scope.row.[item.key]=='不合格'}"
            >{{scope.row.[item.key]}}</a>
          <span v-else-if="item.type===Array">
            <span v-for="value in scope.row.[item.key]" :key='value'>
              {{value}}&nbsp;
            </span>
          </span>
          <span v-else>{{scope.row.[item.key]}}</span>
        </template>
      </el-table-column>
      <el-table-column label='操作' v-if="controlType=='editAndDelete'" width="150">
        <template #default='scope'>
          <el-button
            size='mini'
            type='primary'
            @click='handleEdit(scope.row)'
            :disabled="scope.row.status=='已完成'||scope.row.status=='测试中'"
            >编辑</el-button>
          <el-button
            size='mini'
            type='danger'
            @click='handleDelete(scope.$index, scope.row)'
            :disabled="scope.row.status=='已完成'||scope.row.status=='测试中'"
            >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label='操作' v-else-if="controlType=='viewAndApprove'" width="150">
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
      <el-table-column label='操作' v-else-if="controlType=='upload'" width="250">
        <template #default='scope'>
          <el-button
            size='mini'
            type='primary'
            plain
            @click='handleUploadCase(scope.row)'
            >传用例</el-button>
          <el-button
            size='mini'
            type='primary'
            @click='handleUploadResult(scope.row)'
            >传结果</el-button>
          <el-button
            size='mini'
            type='success'
            @click='handleIssueLicense(scope.row)'
            >发许可</el-button>
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
