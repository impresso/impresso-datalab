// src/mocks/handlers.js
import { ws } from "msw"

const chat = ws.link("/mock-socket.io")

export const handlers = [
  chat.addEventListener("connection", ({ client }) => {
    console.log("Client connected")
    client.addEventListener("message", (event) => {
      client.send("hello from server!")
    })
  }),
]
