<template>
  <Modal
    hideFooter
    :show="view === BrowserViewChangePassword"
    @close="handleDismiss"
    bodyClass="p-3"
    dialogClass="ChangePasswordModal modal-md modal-dialog-centered"
  >
    <template #modal-header="{ close }">
      <h5 class="modal-title">Change Password</h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="close"
      ></button>
    </template>
    <ChangePasswordForm client:only="vue" @submit="handleOnSubmit">
      <template #submit-button="{ submit, disabled }">
        <button
          type="button"
          @click="submit"
          :disabled="isLoading || disabled"
          className="btn btn-primary btn-lg px-4"
        >
          <FloppyDiskArrowIn />
          <span className="ms-2" v-if="isLoading"> Updating...</span>
          <span className="ms-2" v-else> Change Password</span>
        </button>
      </template>
      <template #form-errors v-if="error">
        <Alert type="warning" class="mb-3 p-3" role="alert">
          <p class="m-0">{{ error.message }}</p>
        </Alert>
      </template>
    </ChangePasswordForm>
  </Modal>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { FloppyDiskArrowIn } from "@iconoir/vue"
import Alert from "impresso-ui-components/components/Alert.vue"

import ChangePasswordForm from "impresso-ui-components/components/ChangePasswordForm.vue"
import type { PasswordChangePayload } from "impresso-ui-components/components/ChangePasswordForm.vue"
import type { FeathersError } from "@feathersjs/errors"
import Modal from "impresso-ui-components/components/legacy/BModal.vue"
import {
  BrowserViewChangePassword,
  BrowserViewConfirmChangePassword,
} from "../constants"
import { changePasswordService } from "../services"
import { useBrowserStore } from "../store"

const isLoading = ref(false)
const error = ref<FeathersError | null>(null)

function handleOnSubmit(payload: PasswordChangePayload) {
  isLoading.value = true
  error.value = null
  changePasswordService
    .create(payload)
    .then((data) => {
      console.info(
        "[ChangePasswordModal] Password changed successfully. data:",
        data
      )
      useBrowserStore.getState().setView(BrowserViewConfirmChangePassword)
      // setView(BrowserViewConfirmChangePassword)
    })
    .catch((err: FeathersError) => {
      // setError(err)
      error.value = err
      console.error("[ChangePasswordModal] create", err.message, err.data)
    })
    .finally(() => {
      isLoading.value = false
    })
  // Handle form submission logic here
}

const view = ref<string | null>(null)

function handleDismiss() {
  useBrowserStore.getState().setView(null)
}

onMounted(() => {
  const unsubscribe = useBrowserStore.subscribe(
    (state) => (view.value = state.view)
  )

  onBeforeUnmount(() => {
    unsubscribe()
  })
})
</script>
<style>
.ChangePasswordModal {
  --bs-white-rgb: var(--impresso-color-paper-rgb);
}
.ChangePasswordModal .form-group {
  margin-bottom: var(--spacer-3);
}
.ChangePasswordModal .form-group label {
  font-variation-settings: "wght" var(--impresso-wght-bold);
}
.ChangePasswordModal .requirement {
  margin-left: 20px;
}
</style>
