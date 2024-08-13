import type { Preview } from "@storybook/react"

import "./fonts.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../src/styles/style.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
