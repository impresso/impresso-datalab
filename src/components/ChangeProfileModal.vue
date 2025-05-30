<template>
  <Modal
    :show="show"
    @close="() => emit('close')"
    title="Change Profile"
    hideFooter
    dialogClass="SignUpModal modal-md-lg modal-dialog modal-dialog-centered modal-dialog-scrollable"
  >
    <template #modal-header="{ close }">
      <h4 class="modal-title h4">Change Profile</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="close"
      ></button>
    </template>
    <ProfileForm
      v-if="!isLoading"
      :mode="'edit'"
      hide-affiliation-fields
      @submit="handleOnSubmit"
      :initialValues="signUpFormInitialValues"
      :show="show"
      bodyClass="px-3 pt-3 pb-0"
      dialogClass="SignUpModal modal-lg modal-dialog
    modal-dialog-centered modal-dialog-scrollable"
    >
      <template v-if="error" #form-errors>
        <Alert class="mb-3" type="error">{{ error.message }}</Alert>
      </template>
      <template #submit-button="{ submit }">
        <button
          type="button"
          @click="submit"
          class="btn btn-primary btn-lg px-4"
        >
          <FloppyDiskArrowIn />
          <span class="ms-2"> Save Changes</span>
        </button>
      </template>
    </ProfileForm>
  </Modal>
</template>
<script lang="ts" setup>
import Modal from "impresso-ui-components/components/legacy/BModal.vue"
import ProfileForm from "impresso-ui-components/components/ProfileForm.vue"
import type { ProfileFormPayload } from "impresso-ui-components/components/ProfileForm.vue"
import { watch, ref } from "vue"
import { FloppyDiskArrowIn } from "@iconoir/vue"
import type { FeathersError } from "@feathersjs/errors"

import { userService } from "../services"
import Alert from "impresso-ui-components/components/Alert.vue"
import { usePersistentStore } from "../store"
import type { User } from "../types"

const isLoading = ref(true)
const error = ref<FeathersError | null>(null)

const signUpFormInitialValues = ref<ProfileFormPayload>({
  firstname: "",
  lastname: "",
  institutionalUrl: "",
  affiliation: "",
  email: "",
  password: "",
  repeatPassword: "",
  pattern: "",
})

const fetchUser = async () => {
  isLoading.value = true
  userService
    .find()
    .then((data) => {
      console.debug("[ProfileModal] fetchUser success:", data)
      signUpFormInitialValues.value = {
        firstname: data.firstname,
        lastname: data.lastname,
        institutionalUrl: data.institutionalUrl,
        affiliation: data.affiliation,
        email: data.email,
        password: "",
        repeatPassword: "",
        pattern: data.pattern || "",
      }
    })
    .catch((err: FeathersError) => {
      error.value = err
      console.warn(
        "[RegisterModal] fetchUser error ",
        err,
        err.message,
        err.data
      )
    })
    .finally(() => {
      isLoading.value = false
    })
}

const updatePersistentStoreUser = (user: Partial<User>) => {
  // This function can be used to update the persistent store with the user data
  // For example, you might want to use a store like Pinia or Vuex to manage the user state
  console.debug("[ChangeProfileModal] updatePersistentStoreUser")
  usePersistentStore.getState().patchUser(user)
}

const handleOnSubmit = async (payload: ProfileFormPayload) => {
  console.debug("[ChangeProfileModal] handleOnSubmit...")
  await userService
    .update(null, {
      ...payload,
      displayName: `${payload.firstname} ${payload.lastname}`,
      pattern: payload.pattern?.toLowerCase().split(",") || [],
    })
    .then(() => {
      updatePersistentStoreUser({
        firstname: payload.firstname,
        lastname: payload.lastname,
        pattern: payload.pattern?.toLowerCase() || "",
      })
      console.debug("[ChangeProfileModal] handleOnSubmit success")
      emit("close")
    })
    .catch((err: FeathersError) => {
      error.value = err
      console.error("[ChangeProfileModal] Error updating profile:", err)
    })
}

const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: false,
  }
)
const emit = defineEmits(["close"])
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      fetchUser()
    }
  },
  { immediate: true }
)
// const selectedPlan = ref(null)
</script>
