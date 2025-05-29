<template>
  <a
    :href="computedHref"
    :class="computedClassName"
    :target="target"
    :aria-disabled="disabled"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { BaseUrl } from "../constants"
/**
 * Props interface for the Link component
 * Extends standard HTML anchor attributes with custom properties
 */
interface LinkProps extends /* @vue-ignore */ HTMLAttributes {
  /** The destination path or URL */
  to?: string
  /** Additional CSS classes to apply */
  class?: string
  /** Whether to show underline decoration */
  underline?: boolean
  /** Whether the link is disabled */
  disabled?: boolean
  /** Target attribute for the link */
  target?: "_self" | "_blank" | "_parent" | "_top"
}

/**
 * Props definition with default values and validation
 */
const props = withDefaults(defineProps<LinkProps>(), {
  to: "/",
  class: "",
  underline: false,
  disabled: false,
  target: "_self",
})

/**
 * Computed property that constructs the final href URL
 * Combines the base URL from environment variables with the provided path
 * @returns {string} The complete URL with normalized slashes
 */
const computedHref = computed((): string => {
  return [BaseUrl, props.to].join("/").replace(/\/+/g, "/")
})

/**
 * Computed property that builds the final CSS class string
 * Combines underline, disabled, and custom classes
 * @returns {string} The complete class string
 */
const computedClassName = computed((): string => {
  const classes = [
    props.underline ? "text-decoration-underline" : "text-decoration-none",
    "text-reset",
    props.class,
    props.disabled ? "disabled" : "",
  ]

  return classes.filter(Boolean).join(" ")
})
</script>
