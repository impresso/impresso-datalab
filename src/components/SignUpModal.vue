<template>
  <Modal
    hideFooter
    :show="show"
    @close="() => emit('close')"
    bodyClass="px-3 pt-3 pb-0"
    dialogClass="SignUpModal modal-md-lg modal-dialog modal-dialog-centered modal-dialog-scrollable"
  >
    <template #modal-header="{ close }">
      <h4 class="modal-title h4">Register</h4>
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

    <p class="px-3">
      Select the User Plan which best describes your current status and be ready
      to provide evidence for <em>Student User</em> and
      <em>Academic User</em> registrations. Visit the
      <Link to="/plans" class="text-decoration-underline" target="_blank"
        >plans page</Link
      >
      for more information.
    </p>

    <ChangePlanForm
      @change="({ plan }) => (selectedPlan = plan)"
      :availablePlans="AvailablePlansWithLabels"
    >
      <template #submit-button>
        <span></span>
      </template>
    </ChangePlanForm>

    <h2 class="mt-4">2. Complete the registration form</h2>

    <ProfileForm
      @submit="handleOnSubmit"
      @changeAcceptTerms="
        (value) => {
          acceptedTermsOfUse = value ? true : false
        }
      "
    >
      <template #submit-button="{ submit }">
        <button
          type="button"
          @click="submit"
          class="btn btn-primary btn-lg px-4"
          :disabled="!selectedPlan || !acceptedTermsOfUse"
        >
          <FloppyDiskArrowIn />
          <span class="ms-2"> Register</span>
        </button>
      </template>
      <h2 class="mt-4">3. Accept terms of use</h2>
      <template #accept-terms-of-use-label>
        I have read and agree to the{{ " " }}
        <Link
          to="/terms-of-use"
          class="text-decoration-underline"
          target="_blank"
        >
          Impresso Terms of Use</Link
        >.
      </template>
    </ProfileForm>
  </Modal>
</template>
<script lang="ts" setup>
import Modal from "impresso-ui-components/components/legacy/BModal.vue"
import ChangePlanForm from "impresso-ui-components/components/ChangePlanForm.vue"
import ProfileForm from "impresso-ui-components/components/ProfileForm.vue"
import Link from "./Link.vue"
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
const acceptedTermsOfUse = ref(false)
function handleOnSubmit(payload: any) {
  console.log("handleOnSubmit:", payload)
  // Handle the selected plan here
}
</script>
<style></style>
