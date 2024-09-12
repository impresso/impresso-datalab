import { feathers } from "@feathersjs/feathers"
import socketio from "@feathersjs/socketio-client"
import auth from "@feathersjs/authentication-client"
import io from "socket.io-client"
import { usePersistentStore } from "./store"

const setAuthenticatedUser = usePersistentStore.getState().setAuthenticatedUser

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
  }),
)
app.configure(
  socketio(socket, {
    timeout: 20000,
  }),
)
console.info("[services] socket.io version", socket.io.engine.id)

socket.on("connect_error", (err) => {
  console.error("[services] socket.io connection error:", err)
  // reconnnect using transports
  socket.disconnect()
})
socket.on("connect_timeout", (timeout) => {
  console.error("[services] socket.io connection timeout:", timeout)
})
socket.on("connect", async () => {
  console.info("[services] socket.io connection established")

  const token = await app
    .reAuthenticate()
    .then((data) => {
      console.info("[services] reAuthenticate", Object.keys(data))
      return data.accessToken
    })
    .catch((err) => {
      console.error("[services] reAuthenticate", err)
      throw err
    })
  const user = await app
    .service("me")
    .find()
    .then((data) => {
      console.info("[UserArea] user", data)
      return data
    })
    .catch((err) => {
      console.error("[UserArea] user", err)
      throw err
    })
  setAuthenticatedUser(user, token)
})

export const versionService = app.service("version")
export const userService = app.service("me")
