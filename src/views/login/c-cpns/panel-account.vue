<template>
  <div class="account">
    <el-form :model="account" label-width="60px" ref="formRef" :rules="accountRules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="account">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, FormInstance } from 'element-plus'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

// 定义内部的数据
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 定义form的验证规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入用户名~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20个字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '密码必须在3位以上', trigger: 'blur' }
  ]
}

// 定义登录逻辑
const formRef = ref<FormInstance>()
const loginStore = useLoginStore()
function loginAction(isKeep: boolean) {
  // 是否通过了验证
  formRef.value?.validate((isValid) => {
    if (isValid) {
      const name = account.name
      const password = account.password
      // 1.登录操作
      loginStore.accountLoginAction({ name, password })

      // 2.记住密码
      if (isKeep) {
        localCache.setCache('name', name)
        localCache.setCache('password', password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
    } else {
      ElMessage.warning({ message: '账号或者密码输入的规则错误~' })
    }
  })
}

// 定义暴露的属性和方法
defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
