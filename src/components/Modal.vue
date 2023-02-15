<template>
  <Teleport to="body">
    <div v-if="show_modal" class="modal">
      <div class="modal-wrapper">
        <div class="modal-header">
          <h2 class="modal-title">Create SDK</h2>
          <el-icon size="20" class="modal-icon" @click="close">
            <i-ep-close></i-ep-close>
          </el-icon>
        </div>
        <div class="modal-body">
          <div class="modal-box">
            <p class="modal-label required">Client name:</p>
            <el-input v-model="client_name" placeholder="Please input Client name" />
          </div>
          <div class="modal-box">
            <p class="modal-label required">Board name:</p>
            <el-input v-model="board_name" placeholder="Please input Board name" />
          </div>
          <div class="modal-box">
            <p class="modal-label">Tags:</p>
            <el-input v-model="tags" placeholder="Please input Tags" />
          </div>
          <div class="modal-box">
            <p class="modal-label required">Requestor:</p>
            <el-input v-model="requestor" placeholder="Please input Requestor" />
          </div>
          <div class="modal-box">
            <p class="modal-label required">SDK script:</p>
            <el-input v-model="sdk_script" placeholder="Please input SDK script" />
          </div>
        </div>
        <div class="modal-footer">
          <el-button text @click="close">Cancel</el-button>
          <el-button type="primary" :disabled="canSubmit" @click="submit">Submit</el-button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts">
import { computed, ref } from 'vue'

import type { ModalData } from '#/modal'
import type { SDK } from '#/sdk'

export default {
  setup() {
    const show_modal = ref(false)
    const client_name = ref('')
    const board_name = ref('')
    const tags = ref('')
    const requestor = ref('')
    const sdk_script = ref('')
    const target = ref('')
    const callback: any = ref(null)

    return {
      show_modal,
      client_name,
      board_name,
      tags,
      requestor,
      sdk_script,
      target,
      callback
    }
  },
  mounted() {
    const win: any = window
    win.__synnex_modal = this
  },
  computed: {
    canSubmit() {
      return !(this.client_name && this.board_name && this.requestor)
    }
  },
  methods: {
    show(modal_data: ModalData) {
      this.show_modal = true
      this.target = modal_data.id || ''
      this.callback = modal_data.callback
      modal_data.form && this.renderForm(modal_data.form)
    },
    close() {
      this.show_modal = false
      this.reset()
    },
    reset() {
      this.client_name = '',
      this.board_name = '',
      this.tags = '',
      this.requestor = '',
      this.sdk_script = '',
      this.target = '',
      this.callback = null
    },
    submit() {
      const form: SDK = {
        client_name: this.client_name,
        board_name: this.board_name,
        tags: this.tags,
        requestor: this.requestor,
        sdk_script: this.sdk_script,
        actions: this.target
      }
      this.callback && this.callback(this.target, form)
      console.log("form: ", form)
      this.close()
    },
    renderForm(form: SDK) {
      const { client_name, board_name, tags, requestor, sdk_script } = form
      this.client_name = client_name
      this.board_name = board_name
      this.tags = tags
      this.requestor = requestor
      this.sdk_script = sdk_script
    }
  }
}
</script>
<style lang="scss" scoped>
.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);

  .modal-body {}

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-icon:hover {
    cursor: pointer;
  }

  .modal-label {
    margin: 10px 0 4px;
  }
  .modal-label.required::before {
    content: '*';
    display: inline-block;
    color: red;
    padding-right: 4px;
  }

  .modal-title {
    margin: 10px 0;
  }

  .modal-wrapper {
    background-color: #fff;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 0.375rem 0.625rem 0 rgba(0, 0, 0, 0.06);
    padding: 10px 20px;
  }
}
</style>