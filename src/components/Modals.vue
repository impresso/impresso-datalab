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
  <div
    class="position-fixed top-0 w-100"
    style="z-index: var(--z-index-switch-app)"
  >
    <SwitchBetweenAppDatalab
      isApp
      href="/app"
      class="very-small-caps-medium shadow-none"
      color=" var(--impresso-color-black)"
      style="
        background-color: var(--impresso-color-paper-dark);
        color: var(--impresso-color-black);
      "
      >Switch to Impresso App
    </SwitchBetweenAppDatalab>
  </div>
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
import SwitchBetweenAppDatalab from "impresso-ui-components/components/logos/SwitchBetweenAppDatalab.vue"

const view = ref<string | null>(null)

function close() {
  changeView(null)
}

function changeView(newView: string | null) {
  useBrowserStore.getState().setView(newView)
}

onMounted(() => {
  const unsubscribe = useBrowserStore.subscribe(
    (state) => (view.value = state.view),
  )
  onBeforeUnmount(() => {
    unsubscribe()
  })
})
</script>
