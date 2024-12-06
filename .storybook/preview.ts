import type { Preview } from "@storybook/react"
import { initialize, mswLoader } from "msw-storybook-addon"

import "./fonts.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../src/styles/global.css"
import { handlers } from "./mocks-ws"

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: {
        chat: handlers,
      },
    },
  },
  loaders: [mswLoader], // 👈 Add the MSW loader to all stories
}

export default preview
