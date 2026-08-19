<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建数据" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="登录密码" prop="password" v-if="!isEdit">
            <el-input v-model="formData.password" placeholder="请输入登录密码" />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="deparmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="modal">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import type { IUserPayload } from '@/service/main/types'
import type { PageRecord } from '@/types/page'

interface IUserFormData {
  name: string
  realname: string
  password: string
  cellphone: string
  roleId: number | string
  departmentId: number | string
}

const dialogVisible = ref(false)
const isEdit = ref(false)
const editData = ref<PageRecord | null>(null)

// 部门和角色的数据
const mainStore = useMainStore()
const { entireDepartments, entireRoles } = storeToRefs(mainStore)

// 定义数据绑定
const formData = reactive<IUserFormData>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

// 点击确定
const systemStore = useSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false
  const userData = toUserPayload()
  if (!isEdit.value) {
    systemStore.newUserDataAction(userData)
  } else if (editData.value && typeof editData.value.id === 'number') {
    systemStore.editUserDataAction(editData.value.id, userData)
  }
}

// 新建或者编辑
function setDialogVisible(isNew = true, data: PageRecord = {}) {
  dialogVisible.value = true
  isEdit.value = !isNew
  editData.value = data
  Object.assign(formData, {
    name: isNew ? '' : toStringValue(data.name),
    realname: isNew ? '' : toStringValue(data.realname),
    password: '',
    cellphone: isNew ? '' : toStringValue(data.cellphone),
    roleId: isNew ? '' : toNumberValue(data.roleId),
    departmentId: isNew ? '' : toNumberValue(data.departmentId)
  })
}

function toUserPayload(): IUserPayload {
  const userData: IUserPayload = {
    name: formData.name,
    realname: formData.realname,
    cellphone: Number(formData.cellphone),
    roleId: Number(formData.roleId),
    departmentId: Number(formData.departmentId)
  }
  if (formData.password) userData.password = formData.password
  return userData
}

function toStringValue(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

function toNumberValue(value: unknown) {
  return typeof value === 'number' || typeof value === 'string' ? value : ''
}

defineExpose({
  setDialogVisible
})
</script>

<style scoped lang="less">
.form {
  padding: 10px 30px;
}
</style>
