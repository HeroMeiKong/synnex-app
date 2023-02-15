<template>
  <el-tabs tab-position="left" model-value="1">
    <el-tab-pane v-for="item in tabs" :disabled="item.disabled">
      <template #label>
        <span class="Board-tabs-label">
          <img class="Board-icon" :src="item.icon" :alt="item.label">
          <span>{{ item.label }}</span>
        </span>
      </template>
      <component :is="item.component ? SDKManagement : Nothing" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import Nothing from '@/components/Nothing.vue'
import SDKManagement from '@/components/SDKManagement.vue'

import icon_api from '@/assets/icon_api.svg'

const tabs = reactive([
  {
    id: 'user',
    label: 'User Profile',
    disabled: true,
    icon: icon_api,
    component: false
  },
  {
    id: 'SDK',
    label: 'SDK Management',
    disabled: false,
    icon: icon_api,
    component: true
  },
  {
    id: 'Dashboards',
    label: 'Dashboards',
    disabled: true,
    icon: icon_api,
    component: false
  },
  {
    id: 'TC',
    label: 'Terms & Conditions',
    disabled: true,
    icon: icon_api,
    component: false
  }
])
</script>

<style lang="scss" scoped>
.Board-icon {
  width: 18px;
  margin-right: 8px;
}

.Board-tabs-label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
