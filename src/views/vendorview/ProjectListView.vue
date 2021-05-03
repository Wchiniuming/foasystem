<template>
  <div>
    <search-container>
      <template v-slot:queryCd>
        <el-form :inline="true" :model="projQueryForm" ref='projQueryForm' class="projQuery-form" style="width:100%">
          <el-col :span='20' style="width: 100%">
            <el-col :span='13' style="width: 100%">
              <el-form-item label='项目名称' prop='projectName'>
                <el-input v-model="projQueryForm.projectName" placeholder="项目名称" class='itemInput' clearable></el-input>
              </el-form-item>
              <el-form-item label='产品' prop='productName'>
                <el-input v-model="projQueryForm.productName" placeholder="产品" class='itemInput' clearable></el-input>
              </el-form-item>
              <el-form-item label="状态" prop='status'>
                <el-select v-model="projQueryForm.status" class='itemInput' placeholder="状态" clearable>
                  <el-option label="已完成" value="已完成"></el-option>
                  <el-option label="申请中" value="申请中"></el-option>
                  <el-option label="申请失败" value="申请失败"></el-option>
                  <el-option label="测试中" value="测试中"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='11' style="width: 100%">
              <el-form-item label='创建时间'>
                <el-form-item prop='beginDate'>
                  <el-date-picker
                    v-model='projQueryForm.beginDate'
                    type='date'
                    placeholder='创建时间'
                    >
                  </el-date-picker>
                </el-form-item>
                <span>-</span>
                <el-form-item  prop='endDate'>
                  <el-date-picker
                    v-model='projQueryForm.endDate'
                    type='date'
                    placeholder='结束时间'
                    >
                  </el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span='4' style="width: 100%">
            <el-form-item class='queryBt'>
              <el-button type="primary" small icon='el-icon-search' @click="onQuery('projQueryForm')">查询</el-button>
              <el-button type="info" small icon='el-icon-refresh' @click="resetForm('projQueryForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </template>
    </search-container>
    <div class='newProjectBt'>
      <el-button type='primary' @click='newProject' plain>新建</el-button>
    </div>
    <project-table-list
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
    </project-table-list>
    <el-dialog
      :title="projectEditingForm.projectName"
      v-model="projectEditDialog"
      width="50%"
      destroy-on-close
      :show-close='false'
      center
      :before-close="handleBeforeClose"
      >
      <el-form :model="projectEditingForm" :rules="pEditFormRules" ref="projectEditingForm" label-width="120px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="projectEditingForm.projectName" style="width: 42%" placeholder='项目名称'></el-input>
        </el-form-item>
        <el-form-item label="测试产品" prop="productName">
          <el-col :span='8'>
            <el-input v-model="projectEditingForm.productName" placeholder='测试产品'></el-input>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="版本" prop="productVer">
              <el-input v-model="projectEditingForm.productVer" placeholder='产品版本'></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="产品开发商" prop="company">
          <el-col :span='8'>
            <el-select v-model="projectEditingForm.company" placeholder="厂商">
              <el-option label="华为" value="华为"></el-option>
              <el-option label="亚信" value="亚信"></el-option>
              <el-option label="中兴" value="中兴"></el-option>
              <el-option label="新大陆" value="新大陆"></el-option>
              <el-option label="爱立信" value="爱立信"></el-option>
            </el-select>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="紧急度" prop="projectLevel">
              <el-select v-model="projectEditingForm.projectLevel" placeholder="紧急度">
                <el-option label="低" value="低"></el-option>
                <el-option label="中" value="中"></el-option>
                <el-option label="高" value="高"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="联系人" prop="contactMan">
          <el-input v-model="projectEditingForm.contactMan" placeholder='联系人' style="width: 42%"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-col :span='8'>
            <el-input v-model="projectEditingForm.contactPhone" placeholder='电话'></el-input>
          </el-col>
          <el-col :span='16'>
            <el-form-item label="电子邮件" prop="contactEmail">
              <el-input v-model="projectEditingForm.contactEmail" placeholder='邮件'></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="项目描述" prop="description" style="width: 91%">
          <el-input v-model="projectEditingForm.description"  type="textarea" placeholder='项目描述' :autosize='{minRows: 5, maxRows: 10}' style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            action=""
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="projectEditingForm.fileList"
            :auto-upload='false'
            :on-change="handleUpload"
          >
            <el-button size="small" type="primary">附件上传</el-button>
            <template #tip>
              <div class="el-upload__tip">不得超过5个</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer">
            <el-button @click="onCancelSave('projectEditingForm')">取 消</el-button>
            <el-button type="primary" @click="onEditSave('projectEditingForm')">保 存</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="ctDialogForm.projectName"
      v-model="certificationDialog"
      width="50%"
      destroy-on-close
      center
      >
      <img src='@/assets/image/certification.jpg' style="width: 100%; height: 100%">
      <template #footer>
        <span class="dialog-footer" style="display: flex; justify-content: start">
          <el-button type="text" @click="onCertificationDownLoad">证书下载</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SearchContainer from '@/components/common/SearchContainer.vue'
import ProjectTableList from '@/components/common/ProjectTableList.vue'
import { projectListTableHeader } from '@/common/TableHeaders'
import { projectCreateFormRules } from '@/common/FormRules'
import { getProjectData, getProjectAnnexes } from '@/api/getData'
import { deleteProjectById } from '@/api/deleteData'
import { updataPorject } from '@/api/editData'
import { upload } from '@/utils/upload'
import xlsx from 'xlsx'

export default {
  name: 'ProjectListView',
  data () {
    return {
      controlType: 'editAndDelete',
      projectDataProps: [],
      projectData: [],
      fileList: [],
      // 证书查看页面
      certificationDialog: false,
      ctDialogForm: {},
      // 编辑窗口的属性信息
      projectEditDialog: false,
      projectEditingForm: {},
      projectEditingFormBack: {},
      fileListData: [], // 用于存储附件上传的参数信息
      pEditFormRules: projectCreateFormRules,
      // 查询窗口的属性信息
      projQueryForm: {
        projectName: '',
        productName: '',
        status: '',
        beginDate: '',
        endDate: ''
      },
      tableHeadersProps: projectListTableHeader
    }
  },
  components: {
    SearchContainer,
    ProjectTableList
  },
  created () {
    this.getData()
  },
  methods: {
    onQuery (formName) {
      const pqf = this.projQueryForm
      // 需要先判断是否为null，再判断长度是否为0
      // 筛选的对象字段需要不为空
      const notNull = pqf.projectName.length === 0 && pqf.productName.length === 0 && pqf.status.length === 0 && (pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate === null || pqf.endDate.length === 0)
      if (notNull) {
        this.projectDataProps = this.projectData
      } else if ((pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate === null || pqf.endDate.length === 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.metadata.projectName !== null && project.metadata.projectName.match(pqf.projectName) &&
            project.metadata.productName !== null && project.metadata.productName.match(pqf.productName) &&
            project.metadata.status !== null && project.metadata.status.match(pqf.status)
          })
      } else if (((pqf.beginDate !== null && pqf.beginDate.length !== 0) && (pqf.endDate !== null && pqf.endDate.length !== 0))) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.metadata.projectName !== null && project.metadata.projectName.match(pqf.projectName) &&
            project.metadata.productName !== null && project.metadata.productName.match(pqf.productName) &&
            project.metadata.status !== null && project.metadata.status.match(pqf.status) &&
            project.metadata.createTime !== null && new Date(project.metadata.createTime) >= new Date(pqf.beginDate) &&
            new Date(project.metadata.createTime) <= new Date(pqf.endDate)
          })
      } else if ((pqf.beginDate === null || pqf.beginDate.length === 0) && (pqf.endDate !== null || pqf.endDate.length !== 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.metadata.projectName !== null && project.metadata.projectName.match(pqf.projectName) &&
            project.metadata.productName !== null && project.metadata.productName.match(pqf.productName) &&
            project.metadata.status !== null && project.metadata.status.match(pqf.status) &&
            project.metadata.createTime !== null && new Date(project.metadata.createTime) <= new Date(pqf.endDate)
          })
      } else if ((pqf.beginDate !== null && pqf.beginDate.length !== 0) && (pqf.endDate === null || pqf.endDate.length === 0)) {
        this.projectDataProps = this.projectData
          .filter(project => {
            return project.metadata.projectName !== null && project.metadata.projectName.match(pqf.projectName) &&
            project.metadata.productName !== null && project.metadata.productName.match(pqf.productName) &&
            project.metadata.createTime !== null && project.metadata.status.match(pqf.status) &&
            new Date(project.metadata.createTime) >= new Date(pqf.beginDate)
          })
      } else {
        this.projectDataProps = this.projectData
      }
    },
    getData () {
      const data = { pageNum: 1, pageSize: 20, projectInfo: {} }
      getProjectData(data).then(res => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          this.$alert('账号超时，请重新登录！', '超时', {
            confirmButtonText: 'OK',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 200) {
          this.projectData = res.data.data.list
          this.projectDataProps = this.projectData
        } else {
          this.$message({ message: '数据获取失败！', type: 'error' })
          console.log('数据获取失败！', res.data.msg)
        }
      }).catch(err => {
        this.$message({ message: '网络请求发送失败', type: 'error' })
        console.log('网络请求异常', err)
      })
    },
    /* eslint dot-notation: 0 */
    // 取消按钮事件中绑定resetfields()功能，从而使保存操作的时候，表单数据不会被重置为备份值
    handleBeforeClose (done) {
      this.$refs['projectEditingForm'].resetFields()
      done()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 项目新建
    newProject () {
      this.$router.push({
        name: 'createProject'
      })
    },
    // 项目编辑
    editProject (row) {
      this.projectEditingForm = row
      // 获取附件信息，并加载
      getProjectAnnexes(row.projectId).then(res => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          this.$alert('账号超时，请重新登录！', '超时', {
            confirmButtonText: 'OK',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 200) {
          this.projectEditingForm.fileList = res.data.data.map(item => {
            return { name: item.fileName, status: 'success', projectId: item.projectId }
          })
        } else {
          console.log(res.data.msg)
        }
      }).catch(err => {
        this.$message({ message: '附件信息网络请求异常！', type: 'error' })
        console.log('附件信息网络请求异常！', err)
      })
      this.projectEditDialog = true
    },
    // 取消编辑
    onCancelSave (formName) {
      this.$refs[formName].resetFields()
      this.projectEditDialog = false
    },
    // 项目编辑保存
    onEditSave (formName) {
      // 发送post请求，提交项目数据变更
      // 发送post请求，更新附件信息---待补充代码（如何快速的判断前后数据没有变化？）
      // 关闭dialog
      this.$refs[formName].validate(valid => {
        if (valid) {
          updataPorject(this.projectEditingForm).then(res => {
            if (res.data.code === 2001 || res.data.code === 2009) {
              this.$alert('账号超时，请重新登录！', '超时', {
                confirmButtonText: 'OK',
                callback: () => {
                  this.$router.replace('/login')
                }
              })
            }
            if (res.data.code === 200) {
              this.$message({ message: '项目信息修改成功', type: 'success' })
              this.projectEditDialog = false
            } else {
              this.$message({ message: '项目信息修改失败', type: 'error' })
              console.log('项目信息修改失败', res)
            }
          }).catch(err => {
            this.$message({ message: '网络请求发送失败', type: 'error' })
            console.log('请求发送失败', err)
          })
        }
      })
    },
    // 删除项目
    deleteProject (index, row) {
      this.$confirm('确定移除该条数据吗？').then(() => {
        deleteProjectById(row.projectId).then(res => {
          if (res.data.code === 2001 || res.data.code === 2009) {
            this.$alert('账号超时，请重新登录！', '超时', {
              confirmButtonText: 'OK',
              callback: () => {
                this.$router.replace('/login')
              }
            })
          }
          if (res.data.code === 200) {
            this.projectData.splice(index, 1)
            this.projectDataProps = this.projectData
            this.$message({ message: '项目删除成功', type: 'success' })
          } else {
            this.$message({ message: '项目删除失败', type: 'error' })
            console.log('项目删除失败', res)
          }
        }).catch(err => {
          this.$message({ message: '删除请求失败', type: 'error' })
          console.log('请求失败', err)
        })
      }).catch((cancel) => {})
    },
    // 查看项目详情
    viewProjectDetails (row) {
      this.$router.push(
        {
          name: 'projectDetails',
          params: { projectId: row.projectId, data: JSON.stringify(row) }
        }
      )
    },
    // 查看用例详情
    viewCaseDetails (row) {
      this.$router.push(
        {
          name: 'caseDetailsView',
          params: { projectId: row.projectId }
        }
      )
    },
    // 点击通过率，查看测试结果
    viewTestResult (row) {
      this.$router.push(
        {
          name: 'testResult',
          params: {
            projectId: row.projectId,
            data: JSON.stringify(row)
          }
        }
      )
    },
    // 点击认证情况
    viewCertification (row) {
      if (row.certificated === '已获得') {
        this.ctDialogForm = row
        this.certificationDialog = true
      } else {
        return false
      }
    },
    // 认证文件下载
    onCertificationDownLoad () {
      // 下载功能实现①通过超链接直接访问后端下载;
    },
    // 项目编辑窗口中的附件上传功能
    async handleUpload (ev) {
      // 获取时间的目标对象，并解析
      const file = ev.raw
      const name = file.name
      if (!file) return
      let reader = await upload(file)
      // 读取识别目标对象，将其编译出来
      const worker = xlsx.read(reader, { type: 'binary' })
      // 将返回的数据转换为json对象的数据
      reader = xlsx.utils.sheet_to_json(worker.Sheets[worker.SheetNames[0]])
      this.fileList.push({ name: name, data: reader, status: 'success' })
      this.fileListData.push(reader)
      // 将解析的数据进行字段对应，并通过接口传递至后端(根据接口的要求，确定是解析后上传还是直接上传reader的形式)
    },
    // 附件移除
    handleRemove (file, fileList) {
      this.projectEditingForm.fileList = fileList
      this.fileListData.splice(this.fileListData.indexOf(file), 1)
    },
    // 附件超限提醒
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 附件移除前确认（可以直接在handleRemove中实现）
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>

<style scoped>
  .itemInput {
    width: 145px;
  }
  .newProjectBt {
    margin-bottom: 10px;
  }
</style>
