<template>
  <Modal
    hideFooter
    :show="show"
    @close="() => emit('dismiss')"
    bodyClass="px-3"
    dialogClass="ChangePlanRequestModal modal-lg-md modal-dialog-centered"
    ><template #modal-header="{ close }">
      <h5 class="modal-title">Change Plan</h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="close"
      ></button>
    </template>
    <ChangePlanForm
      v-if="!isLoading"
      :availablePlans="AvailablePlansWithLabels"
      @submit="handleOnSubmit"
      :is-loading="isLoading"
      :currentPlan="userPlan"
      :rejectedPlan="rejectedPlan"
      :pendingPlan="pendingPlan"
      :currentAffiliation="currentAffiliation"
      :currentInstitutionalUrl="currentInstitutionalUrl"
      :currentEmail="currentEmail"
      enableAdditionalFields
    >
      <template #form-errors v-if="error">
        <Alert type="warning" class="mb-3 p-3" role="alert">
          <p class="m-0">{{ error.message }}</p>
        </Alert>
      </template>
      <template #submit-button="{ submit, disabled }">
        <button
          type="button"
          @click="submit"
          :disabled="isLoading || disabled"
          class="btn btn-primary btn-lg px-4"
        >
          <Send />
          <span class="ms-2" v-if="isLoading"> Updating...</span>
          <span class="ms-2" v-else> Send Plan change request</span>
        </button>
      </template>
    </ChangePlanForm>
  </Modal>
</template>

<script lang="ts" setup>
import ChangePlanForm from "impresso-ui-components/components/ChangePlanForm.vue"
import Modal from "impresso-ui-components/components/legacy/BModal.vue"
import Alert from "impresso-ui-components/components/Alert.vue"
import { AvailablePlansWithLabels } from "../constants"
import { ref, watch } from "vue"
import { Send } from "@iconoir/vue"
import type { FeathersError } from "@feathersjs/errors"
import { userChangePlanRequestService, userService } from "../services"
import type { User, UserChangePlanRequest } from "../types"
import { usePersistentStore } from "../store"

export interface ChangePlanRequestModalProps {
  show?: boolean
}

const props = withDefaults(defineProps<ChangePlanRequestModalProps>(), {
  show: true,
})
// refs
const userPlan = ref<string | null>(null)
const rejectedPlan = ref<string | null>(null)
const pendingPlan = ref<string | null>(null)
const currentAffiliation = ref<string>("")
const currentInstitutionalUrl = ref<string>("")
const currentEmail = ref<string>("")
const isLoading = ref(true)
const error = ref<FeathersError | null>(null)

const emit = defineEmits<{
  dismiss: []
  success: []
}>()

async function handleOnSubmit(payload: {
  plan: string
  email?: string
  affiliation?: string
  institutionalUrl?: string
}) {
  // Emit success event to notify parent component
  console.info("[ChangePlanModal] handleOnSubmit", payload)
  if (payload.email || payload.affiliation || payload.institutionalUrl) {
    // If any of the optional fields are provided, update the user service
    await userService
      .patch(null, {
        affiliation: payload.affiliation || currentAffiliation.value,
        institutionalUrl:
          payload.institutionalUrl || currentInstitutionalUrl.value,
        email: payload.email || currentEmail.value,
      })
      .then((data) => {
        console.info("[ChangePlanModal] User updated successfully:", data)
      })
      .catch((err: FeathersError) => {
        error.value = err
        console.error(
          "[ChangePlanModal] Error updating user:",
          err.message,
          err.data
        )
      })
  }

  await userChangePlanRequestService
    .create({
      plan: payload.plan,
    })
    .then((data) => {
      console.info(
        "[ChangePlanModal] Plan-change request created successfully. data:",
        data
      )
      emit("success")
    })
    .catch((err: FeathersError) => {
      error.value = err
      console.error("[ChangePlanModal] create", err.message, err.data)
    })
  // emit("success")
}

const fetchUser = async () => {
  isLoading.value = true
  // get user plan from store
  userPlan.value = usePersistentStore.getState().userPlan
  // get affiliation adn insitutionalUrl from user service
  await userService
    .find()
    .then((data: User) => {
      currentAffiliation.value = data.affiliation || ""
      currentInstitutionalUrl.value = data.institutionalUrl || ""
      currentEmail.value = data.email || ""
      console.debug(
        "[ChangePlanRequestModal] fetchUser success:",
        currentAffiliation.value,
        currentInstitutionalUrl.value,
        currentEmail.value
      )
    })
    .catch((err: FeathersError) => {
      error.value = err
      console.warn(
        "[ChangePlanRequestModal] fetchUser error ",
        err,
        err.message,
        err.data
      )
    })
  await userChangePlanRequestService
    .find()
    .then((data: UserChangePlanRequest) => {
      console.info(
        "[ChangePlanRequestModal] @useEffect - userChangePlanRequestService",
        data
      )
      rejectedPlan.value = data.status === "rejected" ? data.plan.name : null
      pendingPlan.value = data.status === "pending" ? data.plan.name : null
    })
    .catch((err: FeathersError) => {
      error.value = err
      console.error(
        "[ChangePlanModal] @useEffect - userChangePlanRequestService",
        err.message,
        err.data
      )
    })
  isLoading.value = false
}

watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      fetchUser()
    }
  },
  { immediate: true }
)
</script>
<style>
.ChangePlanRequestModal .position-sticky {
  background: linear-gradient(#fafbf200 0%, #fafbf2 30%, #fafbf2);
}
.ChangePlanRequestModal .bg-white {
  --bs-bg-opacity: 0;
}
.ChangePlanRequestModal .ChangePlanForm label .badge {
  background-color: var(--impresso-color-black) !important;
}
</style>
