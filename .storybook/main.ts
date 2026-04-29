import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    // "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {},
    },
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {}
    config.resolve.dedupe = ["react", "react-dom"]
    return config
  },
}
export default config
