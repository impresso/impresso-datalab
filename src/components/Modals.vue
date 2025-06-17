<template>
  <ChangePasswordModal
    @close="close"
    :show="view === BrowserViewChangePassword"
  />
  <SignUpModal
    @success="() => changeView(BrowserViewConfirmRegistration)"
    @close="close"
    :show="view === BrowserViewRegister"
  />
  <ChangeProfileModal @close="close" :show="view === BrowserViewProfile" />
  <ChangePlanRequestModal
    @success="() => changeView(BrowserViewConfirmChangePlanRequest)"
    @close="close"
    :show="view === BrowserViewChangePlanRequest"
  />
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
import {
  BrowserViewChangePassword,
  BrowserViewRegister,
  BrowserViewProfile,
  BrowserViewConfirmRegistration,
  BrowserViewChangePlanRequest,
  BrowserViewConfirmChangePlanRequest,
} from "../constants"
import ChangePasswordModal from "./ChangePasswordModal.vue"
import ChangePlanRequestModal from "./ChangePlanRequestModal.vue"
import ChangeProfileModal from "./ChangeProfileModal.vue"
import SignUpModal from "./SignUpModal.vue"
const view = ref<string | null>(null)

function close() {
  changeView(null)
}

function changeView(newView: string | null) {
  useBrowserStore.getState().setView(newView)
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
