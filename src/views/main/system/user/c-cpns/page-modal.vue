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

const dialogVisible = ref(false)
const isEdit = ref(false)
const editData = ref()

// 部门和角色的数据
const mainStore = useMainStore()
const { entireDepartments, entireRoles } = storeToRefs(mainStore)

// 定义数据绑定
const formData = reactive<any>({
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
  if (!isEdit.value) {
    systemStore.newUserDataAction(formData)
  } else {
    systemStore.editUserDataAction(editData.value.id, formData)
  }
}

// 新建或者编辑
function setDialogVisible(isNew: boolean = true, data: any = {}) {
  dialogVisible.value = true
  isEdit.value = !isNew
  editData.value = data
  for (const key in formData) {
    if (isNew) {
      formData[key] = ''
    } else {
      formData[key] = data[key]
    }
  }
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
