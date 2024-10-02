import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { User } from "./components/UserCard"

interface PersistentStoreState {
  user: User | null
  token: string | null
  setAuthenticatedUser: (user: User | null, token: string | null) => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

export const useBrowserStore = create<{
  view: string | null
  setView: (view: string | null) => void
  wsStatus: "idle" | "connecting" | "connected" | "closed"
  setWsStatus: (
    wsStatus: "idle" | "connecting" | "connected" | "closed"
  ) => void
}>((set) => ({
  view: null,
  setView: (view) => set({ view }),
  wsStatus: "idle",
  setWsStatus: (wsStatus) => set({ wsStatus }),
}))

export const usePersistentStore = create<
  PersistentStoreState,
  [["zustand/persist", PersistentStoreState]]
>(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      rememberCredentials: false,
      setAuthenticatedUser(user, token) {
        set({ user, token })
      },
      setUser(user) {
        set({ user })
      },
      setToken(token) {
        set({ token })
      },
      reset() {
        localStorage.removeItem("feathers-jwt")
        set({ user: null, token: null })
      },
      patchUser(user: User) {
        // get the current user and patch it with the new user
        const currentUser = get().user
        set({
          user: {
            ...currentUser,
            ...user,
          },
        })
      },
    }),
    {
      name: "impresso-datalab",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

// get fresh data from the localstorage
const existingToken = window.localStorage.getItem("feathers-jwt")

if (existingToken && usePersistentStore.getState().token === null) {
  console.info("[usePersistentStore] use existing token from feathers-jwt")
  usePersistentStore.setState({ token: existingToken })
} else {
  console.info("[usePersistentStore] use fresh token")
}
