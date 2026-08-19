<template>
  <div class="header-crumbs">
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in breadcrumbs" :key="index">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="header-crumbs">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mapPathToBreadcrumbs } from '@/utils/map-menu'
import useLoginStore from '@/store/login/login'

const route = useRoute()
const loginStore = useLoginStore()
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(loginStore.userMenus, route.path)
})
</script>

<style scoped lang="less"></style>
