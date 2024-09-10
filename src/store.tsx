import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { User } from "./components/UserCard"

interface PersistentStoreState {
  user: User | null
  token: string | null
  setAuthenticatedUser: (user: User, token: string) => void
}

export const useBrowserStore = create<{
  view: string | null
  setView: (view: string | null) => void
}>((set) => ({
  view: null,
  setView: (view) => set({ view }),
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
      setAuthenticatedUser(user: User, token: string) {
        set({ user, token })
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
    },
  ),
)

// // get fresh data from the localstorage
// const existingToken = window.localStorage.getItem("feathers-jwt")

// if (existingToken && usePersistentStore.getState().token === null) {
//   console.info("[usePersistentStore] use existing token from feathers-jwt")
//   usePersistentStore.setState({ token: existingToken })
// } else {
//   console.info("[usePersistentStore] use fresh token")
// }
