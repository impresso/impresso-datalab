<template>
  <Modal
    hideFooter
    :show="show"
    @close="() => emit('close')"
    bodyClass="px-3 pt-3 pb-0"
    dialogClass="SignUpModal modal-lg modal-dialog modal-dialog-centered modal-dialog-scrollable"
  >
    <template #modal-header="{ close }">
      <h5 class="modal-title">Register</h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="close"
      ></button>
    </template>
    <p>
      Create your Impresso account to explore the full potential of our Web App
      and Datalab.
    </p>
    <h2 class="mt-4">1. Select the User Plan which fits your profile</h2>

    Select the User Plan which best describes your current status and be ready
    to provide evidence for <em>Student User</em> and
    <em>Academic User</em> registrations. Visit the plans page for more
    information.

    <ChangePlanForm
      @change="({ plan }) => (selectedPlan = plan)"
      :availablePlans="AvailablePlansWithLabels"
    >
      <template #submit-button>
        <span></span>
      </template>
    </ChangePlanForm>

    <h2 class="mt-4">2. Complete the registration form</h2>

    <SignUpForm @submit="handleOnSubmit">
      <template #submit-button="{ submit }">
        <button
          type="button"
          @click="submit"
          class="btn btn-primary btn-lg px-4"
          :disabled="!selectedPlan"
        >
          <FloppyDiskArrowIn />
          <span class="ms-2"> Register {{ selectedPlan }}</span>
        </button>
      </template>
    </SignUpForm>
  </Modal>
</template>
<script lang="ts" setup>
import Modal from "impresso-ui-components/components/legacy/BModal.vue"
import ChangePlanForm from "impresso-ui-components/components/ChangePlanForm.vue"
import SignUpForm from "impresso-ui-components/components/SignUpForm.vue"
import { FloppyDiskArrowIn } from "@iconoir/vue"
import { AvailablePlansWithLabels } from "../constants"
import { ref } from "vue"

withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: false,
  }
)
const emit = defineEmits(["close"])
const selectedPlan = ref(null)

function handleOnSubmit(payload) {
  console.log("handleOnSubmit:", payload)
  // Handle the selected plan here
}
</script>
<style></style>
