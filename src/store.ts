import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import {
  AccessTokenKey,
  BrowserWsStatuses,
  BrowserWsStatusIdle,
  BrowserViews,
  PlanGuest,
  PlanEducational,
  PlanResearcher,
  Plans,
  PlanImpressoUser,
} from "./constants"
import type { User } from "./types"

interface PersistentStoreState {
  user: User | null
  userPlan: (typeof Plans)[number]
  token: string | null
  acceptTermsDate: string | null
  setAuthenticatedUser: (user: User, token: string) => void
  setUser: (user: User | null) => void
  patchUser: (user: Partial<User>) => void
  setToken: (token: string | null) => void
  setAcceptedTermsDate: (date: string | null) => void
  reset: () => void
}

export const useBrowserStore = create<{
  view: (typeof BrowserViews)[number] | null
  setView: (view: (typeof BrowserViews)[number] | null) => void
  wsStatus: (typeof BrowserWsStatuses)[number]
  setWsStatus: (wsStatus: (typeof BrowserWsStatuses)[number]) => void
}>((set) => ({
  view: null,
  setView: (view) => set({ view }),
  wsStatus: BrowserWsStatusIdle,
  setWsStatus: (wsStatus) => set({ wsStatus }),
}))

export const usePersistentStore = create<
  PersistentStoreState,
  [["zustand/persist", PersistentStoreState]]
>(
  persist(
    (set, get) => ({
      user: null,
      userPlan: PlanGuest,
      token: null,
      rememberCredentials: false,
      acceptTermsDate: null,
      setAcceptedTermsDate(date) {
        set({ acceptTermsDate: date })
      },
      setAuthenticatedUser(user, token) {
        if (token) {
          localStorage.setItem(AccessTokenKey, token)
        }
        set({ user, token })
      },
      setUser(user) {
        let userPlan = user !== null ? PlanImpressoUser : PlanGuest
        if (user !== null && user.groups) {
          for (const group of user.groups) {
            if (
              group.name === PlanEducational ||
              group.name === PlanResearcher
            ) {
              userPlan = group.name
              break
            }
          }
        }
        set({ user, userPlan })
      },
      patchUser(user) {
        // get the current user and patch it with the new user
        const currentUser: User = get().user as User
        set({
          user: {
            ...currentUser,
            ...user,
          },
        })
      },
      setToken(token) {
        set({ token })
      },
      reset() {
        localStorage.removeItem(AccessTokenKey)
        set({ user: null, token: null, acceptTermsDate: null })
      },
    }),
    {
      name: "impresso-datalab",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

// get fresh data from the localstorage
const existingToken = window.localStorage.getItem(AccessTokenKey)

if (existingToken && usePersistentStore.getState().token === null) {
  console.info("[usePersistentStore] use existing token from feathers-jwt")
  usePersistentStore.setState({ token: existingToken })
} else {
  console.info("[usePersistentStore] use fresh token")
}
