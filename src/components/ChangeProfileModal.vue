<template>
  <Modal
    :show="show"
    @close="() => emit('close')"
    title="Change Profile"
    hideFooter
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
      :mode="'edit'"
      :initialValues="signUpFormInitialValues"
      :show="show"
      bodyClass="px-3 pt-3 pb-0"
      dialogClass="SignUpModal modal-lg modal-dialog
    modal-dialog-centered modal-dialog-scrollable"
    />
    {{ signUpFormInitialValues }}
  </Modal>
</template>
<script lang="ts" setup>
import Modal from "impresso-ui-components/components/legacy/BModal.vue"
// import ChangePlanForm from "impresso-ui-components/components/ChangePlanForm.vue"
import ProfileForm from "impresso-ui-components/components/ProfileForm.vue"
import type { ProfileFormPayload } from "impresso-ui-components/components/ProfileForm.vue"
// import { FloppyDiskArrowIn } from "@iconoir/vue"
// import { AvailablePlansWithLabels } from "../constants"
import { watch, ref } from "vue"
import { userService } from "../services"

const signUpFormInitialValues = ref<ProfileFormPayload>({
  firstname: "",
  lastname: "",
  institutionalUrl: "",
  affiliation: "",
  email: "",
  password: "",
  repeatPassword: "",
})

const fetchUser = async () => {
  userService.find().then((data) => {
    console.info("[ProfileModal] @useEffect - user", data)
    signUpFormInitialValues.value = {
      firstname: data.firstname,
      lastname: data.lastname,
      institutionalUrl: data.institutionalUrl,
      affiliation: data.affiliation,
      email: data.email,
      password: "",
      repeatPassword: "",
    }
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
