<template>
  <div>
    <case-details
      :search='true'
      :controlType='controlType'
      :tableHeadersProps='tableHeaders'
      :caseDataResource='caseInfo'
      :multiDownL='true'
      :multiDel='true'
      :caseUpl='true'
      :modelDl='true'
      @caseQuery='doCaseQuery'
      @doCaseEdit='editCase'
      @doCaseDelete='deleteCase'
      @multiCaseDelete='multiCaseDelete'
      @multiDownLoad='multiDownLoad'
      @uploadCase='uploadCase'
    ></case-details>
    <el-dialog
      :title="caseEditingForm.useCaseName"
      v-model="caseEditDialog"
      width="60%"
      destroy-on-close
      :show-close='false'
      center
      :before-close="handleBeforeClose"
      >
      <el-form :model="caseEditingForm" :rules="caseEditFormRules" ref="caseEditingForm" label-width="120px">
        <el-form-item label="用例编号" prop="useCaseId">
          <el-input v-model="caseEditingForm.useCaseId" disabled style="width: 42%" placeholder='用例编号'></el-input>
        </el-form-item>
        <el-form-item label="模块一" prop="module1">
          <el-col :span='8'>
            <el-input v-model="caseEditingForm.module1" placeholder='模块一'></el-input>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="模块二" prop="module2">
              <el-input v-model="caseEditingForm.module2" placeholder='模块二'></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="模块三" prop="module3">
          <el-col :span='8'>
            <el-input v-model="caseEditingForm.module3" placeholder='模块三'></el-input>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="模块四" prop="module4">
              <el-input v-model="caseEditingForm.module4" placeholder='模块四'></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="用例名称" prop="useCaseName">
          <el-input v-model="caseEditingForm.useCaseName" style="width: 42%" placeholder='用例名称'></el-input>
        </el-form-item>
        <el-form-item label="测试目的" prop="purpose">
          <el-input v-model="caseEditingForm.purpose" placeholder='测试目的' style="width: 42%"></el-input>
        </el-form-item>
        <el-form-item label="预置条件" prop="beforeTest" style="width: 91%">
          <el-input v-model="caseEditingForm.beforeTest"  type="textarea" placeholder='预置条件' :autosize='{minRows: 3, maxRows: 10}' style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="测试步骤" prop="steps" style="width: 91%">
          <el-input v-model="caseEditingForm.steps"  type="textarea" placeholder='测试步骤' :autosize='{minRows: 3, maxRows: 10}' style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="预期结果" prop="expectResult" style="width: 91%">
          <el-input v-model="caseEditingForm.expectResult"  type="textarea" placeholder='预期结果' :autosize='{minRows: 3, maxRows: 10}' style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer">
            <el-button @click="onCancelSave('caseEditingForm')">取 消</el-button>
            <el-button type="primary" @click="onEditSave('caseEditingForm')">保 存</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CaseDetails from '@/components/content/CaseDetails'
import { casesMaintainHeaders } from '@/common/TableHeaders'
import { getCasesByPid } from '@/api/getData'
import { deleteCaseById } from '@/api/deleteData'
import { updateCase } from '@/api/editData'
import { caseEditFormRules } from '@/common/FormRules'
import { casesDownLoad } from '@/utils/download'
import { casesDelete } from '@/utils/delete'
import { casesImport } from '@/api/import'
import { upload } from '@/utils/upload'
import { caseFormatValidate } from '@/utils/validate'

export default {
  name: 'CasesMaintain',
  components: {
    CaseDetails
  },
  data () {
    return {
      controlType: 'editAndDelete',
      tableHeaders: casesMaintainHeaders,
      caseEditFormRules: caseEditFormRules,
      caseInfo: [],
      caseData: [],
      caseEditingForm: {},
      caseEditDialog: false,
      projectId: this.$route.params.projectId
    }
  },
  methods: {
    getData () {
      const data = {
        projectId: this.projectId,
        pageNum: 1,
        pageSize: 50
      }
      getCasesByPid(data).then(res => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          this.$alert('账号超时，请重新登录！', '超时', {
            confirmButtonText: 'OK',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 200) {
          this.caseInfo = res.data.data.list
          this.caseData = this.caseInfo
          console.log(res.data.data)
        } else {
          console.log('数据获取失败', res)
        }
      }).catch(err => {
        this.$message({ message: '网络请求异常', type: 'error' })
        console.log('网络请求异常', err)
      })
    },
    multiDownLoad (selectedCases) {
      casesDownLoad(selectedCases, this)
    },
    doCaseQuery (queryForm) {
      if (queryForm.useCaseName.length === 0 && queryForm.module1.length === 0 && queryForm.module2.length === 0 && queryForm.purpose.length === 0 && queryForm.expectResult.length === 0) {
        this.caseInfo = this.caseData
      } else {
        this.caseInfo = this.caseData.filter(
          casesItem => {
            return casesItem.useCaseName.match(queryForm.useCaseName) &&
            casesItem.module1.match(queryForm.module1) &&
            casesItem.module2.match(queryForm.module2) &&
            casesItem.purpose.match(queryForm.purpose) &&
            casesItem.expectResult.match(queryForm.expectResult)
          }
        )
      }
    },
    editCase (row) {
      this.caseEditingForm = row
      this.caseEditDialog = true
    },
    /* eslint dot-notation: 0 */
    // 取消按钮事件中绑定resetfields()功能，从而使保存操作的时候，表单数据不会被重置为备份值
    handleBeforeClose (done) {
      this.$refs['caseEditingForm'].resetFields()
      done()
    },
    onCancelSave (formName) {
      this.$refs[formName].resetFields()
      this.caseEditDialog = false
    },
    onEditSave () {
      updateCase(this.caseEditingForm).then((res) => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          this.$alert('账号超时，请重新登录！', '超时', {
            confirmButtonText: 'OK',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 200) {
          // 只要携带新ID的修订均未成功写入数据库
          this.$message({ message: '用例更新成功!', type: 'success' })
          this.caseEditDialog = false
        } else {
          this.$message({ message: '用例更新成功!', type: 'success' })
          console.log('用例更新失败！', res)
        }
      }).catch(err => {
        this.$message({ message: '网络请求失败', type: 'error' })
        console.log('网络请求失败', err)
      })
    },
    multiCaseDelete (selectedCases) {
      casesDelete(selectedCases, this.caseInfo, this.caseData, this)
    },
    deleteCase (index, row) {
      this.$confirm('确认删除该用例吗？').then(() => {
        deleteCaseById([row.useCaseId]).then(res => {
          if (res.data.code === 2001 || res.data.code === 2009) {
            this.$alert('账号超时，请重新登录！', '超时', {
              confirmButtonText: 'OK',
              callback: () => {
                this.$router.replace('/login')
              }
            })
          }
          if (res.data.code === 200) {
            this.caseData.splice(index, 1)
            this.caseInfo = this.caseData
            this.$message({ message: '用例删除成功！', type: 'success' })
          } else {
            this.$message({ message: '数据删除失败', type: 'error' })
            console.log('数据删除失败', res)
          }
        }).catch(err => {
          this.$message({ message: '网络请求失败', type: 'error' })
          console.log('网络请求失败', err)
        })
      }).catch((cancel) => {})
    },
    async uploadCase (ev) {
      const file = ev.raw
      if (!file) return
      // 解析
      const reader = await upload(file)
      if (caseFormatValidate(reader)) {
        // 发送请求，后端上传写入数据
        casesImport(this.projectId, file).then(res => {
          if (res.data.code === 200) {
            // 上传成功时，在前端写入用例数据
            // 将中文表头转换为程序英文表头，并将数据写入加载内容中展示
            this.$message({
              message: '数据导入成功！',
              type: 'success'
            })
            this.getData()
          } else {
            this.$message({
              message: '数据导入失败',
              type: 'error'
            })
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message({ message: '用例编号无需填写，或日期格式不正确，请检查！', type: 'error' })
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
