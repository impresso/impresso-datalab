<template>
  {{ view }}
  <ChangePasswordModal
    @close="close"
    :show="view === BrowserViewChangePassword"
  />
  <SignUpModal @close="close" :show="view === BrowserViewRegister" />
</template>

<script setup lang="ts">
/**
 * Modals
 *
 * This component acts as a centralized manager for displaying various modal windows. It controls modal visibility
 * by subscribing to the `useBrowserStore` Zustand store, reacting to changes in its `view` state, and conditionally
 * rendering the appropriate modal component. Modals are mounted and unmounted from the DOM based on the `show` prop,
 * ensuring optimal performance and resource utilization.
 */
import { onBeforeUnmount, onMounted, ref } from "vue"
import { useBrowserStore } from "../store"
import { BrowserViewChangePassword, BrowserViewRegister } from "../constants"
import ChangePasswordModal from "./ChangePasswordModal.vue"
import SignUpModal from "./SignUpModal.vue"
const view = ref<string | null>(null)

function close() {
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
