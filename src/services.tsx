import { feathers } from "@feathersjs/feathers"
import socketio from "@feathersjs/socketio-client"
import auth from "@feathersjs/authentication-client"
import io from "socket.io-client"
import { usePersistentStore, useBrowserStore } from "./store"

const setToken = usePersistentStore.getState().setToken
const setWsStatus = useBrowserStore.getState().setWsStatus
const socket = io("", {
  path: import.meta.env.PUBLIC_IMPRESSO_WS_API_PATH,
  forceNew: true,
  transports: ["websocket"],
})
// print ut socket version
const app = feathers()
app.configure(
  auth({
    storage: window.localStorage,
  })
)
app.configure(
  socketio(socket, {
    timeout: 20000,
  })
)
console.info("[services] socket.io version", socket.io.engine.id)

socket.on("connect_error", (err) => {
  console.error("[services] socket.io connection error:", err)
  // reconnnect using transports
  socket.disconnect()
  setWsStatus("closed")
})
socket.on("connect_timeout", (timeout) => {
  console.error("[services] socket.io connection timeout:", timeout)
  setWsStatus("closed")
})
socket.on("connect", async () => {
  console.info("[services] @connect - connection established")
  setWsStatus("connecting")
  const token = await app
    .reAuthenticate()
    .then((data) => {
      console.info("[services] @connect reAuthenticate success")
      return data.accessToken
    })
    .catch((err) => {
      console.warn(
        "[services] @connect reAuthenticate failure, skip. Error:",
        err
      )
      return null
    })

  setToken(token)
  setWsStatus("connected")
})

socket.on("reconnect", (attemptNumber) => {
  console.info("[services] @reconnect - attemptNumber", attemptNumber)
})

export const versionService = app.service("version")
export const userService = app.service("me")
export const loginService = app.service("authentication")
