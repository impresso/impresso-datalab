<template>
  <section class="AcceptTermsOfUse d-flex justify-content-center">
    <div class="form-check d-inline-block w-auto">
      <input
        id="terms-of-use"
        type="checkbox"
        class="form-check-input"
        :checked="checked"
        :disabled="disabled"
        @change="handleChange"
      />
      <label for="terms-of-use" class="form-check-label font-weight-bold">
        I HAVE READ and I AGREE to the Impresso Terms of Use.
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
interface AcceptTermsOfUseProps {
  disabled?: boolean
  checked?: boolean
  onChange?: (event: Event) => void
}

const props = withDefaults(defineProps<AcceptTermsOfUseProps>(), {
  disabled: false,
  checked: false,
  onChange: () => {
    console.log("AcceptTermsOfUse.onChange")
  },
})

const handleChange = (event: Event) => {
  props.onChange?.(event)
}
</script>
