import React from "react"
import { delay, http, HttpResponse } from "msw"
import type { Meta, StoryObj } from "@storybook/react"
import AccessToApi, { AccessToApiProps } from "../../pages/access-to-api.mdx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Modal } from "react-bootstrap"

const queryClient = new QueryClient()

const meta: Meta<typeof AccessToApi> = {
  component: AccessToApi,
}

export default meta
type Story = StoryObj<typeof AccessToApi>

const AccessToApiWrapper: React.FC<AccessToApiProps> = ({ llToken }) => {
  return (
    <Modal size="lg" show={true} backdrop="static" keyboard={false} scrollable>
      <Modal.Header closeButton>
        {/* <Link to="/">impresso-datalab</Link> */}
        Access to the Api
      </Modal.Header>
      <Modal.Body className="container">
        <QueryClientProvider client={queryClient}>
          <AccessToApi llToken={llToken} />
        </QueryClientProvider>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary">close</button>
      </Modal.Footer>
    </Modal>
  )
}

export const Default: Story = {
  render: ({ llToken }) => <AccessToApiWrapper llToken={llToken} />,
  args: {
    llToken: "exampleTokenn",
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/public-api/authentication", async () => {
          await delay(800)
          return HttpResponse.json({
            accessToken:
              "AXKJeiciejiJXCSCE.rySOIUHIUC?ISUSDFHUhuHUEHUHCCEU.DFHUhuHUEHUHCCEUDFHUhuHUEHUHCCEUDFHUhuHUEHUHCCEUDFHUhuHUEHUHCCEUDFHUhuHUEHUHCCEUDFHUhuHUEHUHCCEUDFHUhuHUEHUHCCEUDFHUhuHUEHUHCCEUDFHUhuHUEHUHCCEU",
            authentication: {
              strategy: "jwt-app",
              payload: {
                "not-in-use": "yet",
              },
            },
            user: {
              id: 0,
              username: "scaramouche",
              firstname: "Tiberio",
              lastname: "Fiorilli",
              isStaff: true,
              isActive: true,
              isSuperuser: true,
              uid: "scaramouche",
              profile: {
                uid: "scaramouche",
                provider: "local",
                displayName: "Tiberio Fiorilli",
                pattern: [
                  "#8f96c4",
                  "#6d6969",
                  "#511a33",
                  "#981846",
                  "#eb5543",
                ],
              },
              groups: [
                {
                  id: "1",
                  name: "NDA",
                },
                {
                  id: "2",
                  name: "plan-researcher",
                },
              ],
            },
          })
        }),
      ],
    },
  },
}
// https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-network-requests
export const LLTokenExpired: Story = {
  render: ({ llToken }) => <AccessToApiWrapper llToken={llToken} />,

  args: {
    llToken: "Expired Token Example",
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/public-api/authentication", async () => {
          await delay(800)
          return HttpResponse.json(
            {
              details: "Token expired",
            },
            {
              status: 403,
            },
          )
        }),
      ],
    },
  },
}
