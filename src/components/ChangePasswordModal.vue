<template>
  <Modal :show="view === BrowserViewChangePassword" @dismiss="handleDismiss">
    <ChangePasswordForm client:only="vue" @submit="handleOnSubmit" /> </Modal
  >M
  {{ view }}
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { useBrowserStore } from "../store"
import ChangePasswordForm from "impresso-ui-components/components/ChangePasswordForm.vue"
import Modal from "./Modal.vue"
import { BrowserViewChangePassword } from "../constants"

function handleOnSubmit() {
  console.log("hey!")
  // Handle form submission logic here
}

const view = ref<string | null>(null)

function handleDismiss() {
  useBrowserStore.getState().setView(null)
}

onMounted(() => {
  const store = useBrowserStore.getState()

  // Optional: Subscribe to changes
  const unsubscribe = useBrowserStore.subscribe((state) => {
    view.value = state.view
  })

  onBeforeUnmount(() => {
    unsubscribe()
  })
})
</script>
