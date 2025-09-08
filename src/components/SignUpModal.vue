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
      inline
      @change="({ plan }) => (selectedPlan = plan)"
      :availablePlans="AvailablePlansWithLabels"
    >
      <template #submit-button>
        <span></span>
      </template>
    </ChangePlanForm>

    <h2 class="mt-4">2. Complete the registration form</h2>

    <ProfileForm
      :hide-affiliation-fields="hideAffiliationFields"
      @submit="handleOnSubmit"
      @changeAcceptTerms="
        (value) => {
          acceptedTermsOfUse = value ? true : false
        }
      "
    >
      <template v-if="error" #form-errors>
        <Alert class="mb-3" type="error"
          ><FeathersErrorManager :error="error"
        /></Alert>
      </template>
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
          Impresso Terms of Use </Link
        >.
      </template>
    </ProfileForm>
  </Modal>
</template>
<script lang="ts" setup>
import Modal from "impresso-ui-components/components/legacy/BModal.vue"
import ChangePlanForm from "impresso-ui-components/components/ChangePlanForm.vue"
import ProfileForm from "impresso-ui-components/components/ProfileForm.vue"
import type { ProfileFormPayload } from "impresso-ui-components/components/ProfileForm.vue"
import Link from "./Link.vue"
import { FloppyDiskArrowIn } from "@iconoir/vue"
import {
  AvailablePlansWithLabels,
  PlanEducational,
  PlanImpressoUser,
  PlanResearcher,
} from "../constants"
import { computed, ref } from "vue"
import { BadRequest, FeathersError } from "@feathersjs/errors"
import { usersService } from "../services"
import Alert from "impresso-ui-components/components/Alert.vue"
import FeathersErrorManager from "./FeathersErrorManager.vue"

withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: false,
  }
)
const emit = defineEmits(["close", "success"])
const selectedPlan = ref<string | null>(null)
const error = ref<FeathersError | null>(null)
const acceptedTermsOfUse = ref(false)

const hideAffiliationFields = computed(
  () =>
    selectedPlan.value !== PlanEducational &&
    selectedPlan.value !== PlanResearcher
)

function handleOnSubmit(payload: ProfileFormPayload) {
  console.log("handleOnSubmit:", payload)
  // Handle the selected plan here
  if (!selectedPlan.value) {
    error.value = new BadRequest("Please select a plan before submitting.")
    return
  }
  const affiliationFields = {} as {
    affiliation?: string
    institutionalUrl?: string
  }

  if (
    selectedPlan.value === PlanEducational ||
    selectedPlan.value === PlanResearcher
  ) {
    affiliationFields.affiliation = payload.affiliation
  }
  if (selectedPlan.value === PlanResearcher) {
    affiliationFields.institutionalUrl = payload.institutionalUrl
  }
  usersService
    .create({
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      password: payload.password,
      repeatPassword: payload.repeatPassword,
      ...affiliationFields,
      pattern: payload.pattern,
      plan: selectedPlan.value,
      username: payload.email.replace(/[^a-z]/g, ""),
      displayName: `${payload.firstname} ${payload.lastname}`,
    })
    .then((data) => {
      console.debug("[RegisterModal] created!")
      // setAuthenticatedUser(data.user, data.accessToken)
      emit("success")
    })
    .catch((err: FeathersError) => {
      error.value = err
      console.warn("[RegisterModal] create", err, err.message, err.data)
    })
}
</script>
<style>
.SignUpModal .bg-white {
  --bs-bg-opacity: 0.9;
}
</style>
