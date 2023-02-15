<template>
  <div class="SDK_Management">
    <div class="SDK_Management-header">
      <h2>SDK Management</h2>
      <div class="SDK_Management-options">
        <el-input
          v-model="search"
          class="SDK_Management-search"
          placeholder="Search client name,board name, tags, requestor"
          :prefix-icon="Search"
          @input="inputSearch"
        />
        <el-button color="#43b539" :icon="Add" @click="create">Create SDK</el-button>
      </div>
    </div>
    <div class="SDK_Management-body">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="current_rows"
            :width="width"
            :height="height"
            :row-class="rowClass"
            fixed
            stripe
          />
        </template>
      </el-auto-resizer>
    </div>
    <div class="SDK_Management-footer">
      Total: {{ total }}
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { ref, reactive, computed, h, watch } from 'vue'
import type { Column, RowClassNameGetter } from 'element-plus'

import type { SDK } from '#/sdk'

import icon_delete from '@/assets/iconset_Delete.svg'
import icon_edit from '@/assets/iconset_Edit.svg'

const Add = h(
  <el-icon size="16" class="modal-icon">
    <i-ep-plus></i-ep-plus>
  </el-icon>)
const Search = h(
  <el-icon size="16" class="modal-icon">
    <i-ep-search></i-ep-search>
  </el-icon>)

const search = ref('')
const columns: Column<any>[] = [
  {
    dataKey: 'client_name',
    key: 'col_0',
    title: 'Client name',
    width: 150,
    cellRenderer: ({ cellData }) => renderSearchKey(cellData)
  },
  {
    dataKey: 'board_name',
    key: 'col_1',
    title: 'Board name',
    width: 150,
    cellRenderer: ({ cellData }) => renderSearchKey(cellData)
  },
  {
    dataKey: 'tags',
    key: 'col_2',
    title: 'Tags',
    width: 150,
    cellRenderer: ({ cellData: tags }) => (
      tags.length ? tags.split(',').map(tag => <ElTag class="SDK_Management-tag">{renderSearchKey(tag)}</ElTag>) : ''
    )
  },
  {
    dataKey: 'requestor',
    key: 'col_3',
    title: 'Requestor',
    width: 150,
    cellRenderer: ({ cellData }) => renderSearchKey(cellData)
  },
  {
    dataKey: 'sdk_script',
    key: 'col_4',
    title: 'SDK script',
    width: 150,
    cellRenderer: ({ cellData }) => (
      <a href={ cellData }>
        &lt;/&gt; SDK
      </a>
    )
  },
  {
    dataKey: 'actions',
    key: 'col_5',
    title: 'Actions',
    cellRenderer: ({ cellData }) => (
      <>
        <img class="SDK_Management-option" src={icon_edit} onClick={() => update(cellData)}></img>
        <img class="SDK_Management-option" src={icon_delete} onClick={() => deleteRow(cellData)}></img>
      </>
    ),
    width: 150,
    align: 'center',
  }
]
const data = reactive({
  rows: [
    {
      client_name: 'wsafsafsaf',
      board_name: 'sannmdan,mdsv',
      tags: 'tag0,tag1',
      requestor: 'gagagadg',
      sdk_script: 'https://baidu.com',
      actions: '0'
    },
    {
      client_name: 'dsgdsg',
      board_name: 'jrnn',
      tags: 'tag0,tag1',
      requestor: 'ilily',
      sdk_script: 'https://baidu.com',
      actions: '1'
    },
    {
      client_name: 'qwqwqw',
      board_name: 'erererer',
      tags: 'tag0,tag1',
      requestor: 'rtrtrtrt',
      sdk_script: 'https://baidu.com',
      actions: '2'
    },
    {
      client_name: 'tytytyty',
      board_name: 'yuyuyuyuy',
      tags: 'tag0,tag1',
      requestor: 'uiuiuiuiu',
      sdk_script: 'https://baidu.com',
      actions: '3'
    },
    {
      client_name: 'ioioioio',
      board_name: 'opopopop',
      tags: 'tag0,tag1',
      requestor: 'asasasas',
      sdk_script: 'https://baidu.com',
      actions: '4'
    },
    {
      client_name: 'sdsdsdsd',
      board_name: 'dfdfdf',
      tags: 'tag0,tag1',
      requestor: 'fgfgfgfg',
      sdk_script: 'https://baidu.com',
      actions: '5'
    }
  ],
  search_arr: []
})

const total = computed(() => data.rows.length)
const counter = ref(data.rows.length)

watch(search, (value) => searchKey(value))

const current_rows = computed(() => {
  return search.value === '' ? data.rows : data.search_arr
})

function inputSearch(value: string) {
  window.requestIdleCallback(() => {
    search.value = value
  })
}

function searchKey(search: string) {
  console.log("searchKey: ", search)
  const arr: any = []
  for (let i = 0, length = data.rows.length; i < length; i++) {
    Object.keys(data.rows[i]).map(key => {
      const search_string = data.rows[i][key]
      if (search_string.indexOf(search) > -1) {
        arr.push(data.rows[i])
      }
    })
  }
  data.search_arr = arr
}

function renderSearchKey(str: string) {
  const index = str.indexOf(search.value)
  const length = str.length
  const len = search.value.length
  if (index > -1) {
    if (!index) {
      return (
        <>
          <span class="SDK_Management-key">{search.value}</span>
          {str.substring(index + len, length)}
        </>
      )
    } else if (index === length - 1) {
      return (
        <>
          {str.substring(0, index)}
          <span class="SDK_Management-key">{search.value}</span>
        </>
      )
    } else {
      return (
        <>
          {str.substring(0, index)}
          <span class="SDK_Management-key">{search.value}</span>
          {str.substring(index + len, length)}
        </>
      )
    }
  } else {
    return str
  }
}

function deleteRow(id: string) {
  let index: number = 0
  for (let i = 0; i < total.value; i++) {
    if (data.rows[i].actions === id) {
      index = i
    }
  }
  data.rows.splice(index, 1)
}

function update(id: string) {
  let index: number = 0
  for (let i = 0; i < total.value; i++) {
    if (data.rows[i].actions === id) {
      index = i
    }
  }
  const { client_name, board_name, tags, requestor, sdk_script, actions } = data.rows[index]
  show(id, {
    client_name,
    board_name,
    tags,
    requestor,
    sdk_script,
    actions
  })
}

function create() {
  show(`${counter.value}`)
}

function show(id: string, form?: SDK) {
  const win: any = window
  win.__synnex_modal.show({
    id,
    callback: (id: string, form: SDK) => {
      const { client_name, board_name, tags, requestor, sdk_script, actions } = form
      if (form) {
        data.rows.splice(Number(id), 1, {
          client_name,
          board_name,
          tags,
          requestor,
          sdk_script,
          actions
        })
      } else {
        counter.value++
        data.rows.push({
          client_name,
          board_name,
          tags,
          requestor,
          sdk_script,
          actions
        })
      }
    },
    form
  })
}

const rowClass = ({ rowIndex }: Parameters<RowClassNameGetter<any>>[0]) => {
  if (rowIndex % 2) {
    return 'SDK_Management-stripe'
  }
  return ''
}
</script>

<style scope lang="scss">
.SDK_Management {
  .SDK_Management-body {
    height: 600px;
  }

  .SDK_Management-footer {}

  .SDK_Management-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .SDK_Management-key {
    font-weight: 700;
    color: #67C23A;
    font-size: 16px;
  }

  .SDK_Management-option {
    width: 30px;
    height: 30px;
  }
  .SDK_Management-option:hover {
    cursor: pointer;
    background: #ccc;
  }

  .SDK_Management-options {
    display: flex;
  }

  .SDK_Management-search {
    margin-right: 10px;
    width: 360px;
  }

  .SDK_Management-stripe {
    background-color: #eee;
  }

  .SDK_Management-tag:not(first-child) {
    margin-left: 4px;
  }
}
</style>
