<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="modalConfig.title" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'password'">
                <el-input
                  show-password
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData.parentId"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="value in item.options ?? []" :key="value.id">
                    <el-option :value="value.id" :label="value.name" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="formData[item.prop]"
                />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from '@/store/main/system/system'
import { reactive, ref } from 'vue'
import type { IPageModalConfig, PageFormData, PageFormValue, PageRecord } from '@/types/page'

// 定义props
interface IProps {
  modalConfig: IPageModalConfig
  otherInfo?: PageRecord
}

const props = defineProps<IProps>()

const dialogVisible = ref(false)
const isEdit = ref(false)
const editData = ref<PageRecord | null>(null)

// 部门和角色的数据
// const mainStore = useMainStore()
// const { entireDepartments } = storeToRefs(mainStore)

// 定义数据绑定
const initialForm: PageFormData = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const formData = reactive<PageFormData>(initialForm)

// 点击确定
const systemStore = useSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false
  const data: PageRecord = { ...formData }
  if (props.otherInfo) {
    Object.assign(data, props.otherInfo)
  }
  if (!isEdit.value) {
    systemStore.newPageDataAction(props.modalConfig.pageName, data)
  } else if (editData.value && typeof editData.value.id === 'number') {
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, data)
  }
}

// 新建或者编辑
function setDialogVisible(isNew = true, data: PageRecord = {}) {
  dialogVisible.value = true
  isEdit.value = !isNew
  editData.value = data
  for (const key in formData) {
    if (isNew) {
      formData[key] = ''
    } else {
      formData[key] = toFormValue(data[key])
    }
  }
}

function toFormValue(value: unknown): PageFormValue {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    Array.isArray(value) ||
    value === null
  ) {
    return value
  }
  return ''
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
