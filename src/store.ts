import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { User } from "./components/UserCard"

export const ModalDraftView = "draft"
export const ModalForkNotebookView = "fork-notebook"
export const ModalNotebookPreviewView = "notebook-preview"
export const ModalLoginView = "login"
export const ModalTutorialView = "tutorial"

export const AvailableModalsViews = [
  ModalDraftView,
  ModalForkNotebookView,
  ModalNotebookPreviewView,
  ModalLoginView,
  ModalTutorialView,
]

interface BrowserStoreState {
  view: (typeof AvailableModalsViews)[number] | null
  viewId: string | null
  setView: (view: string, viewId?: string) => void
  previousPathname: string | null
  pathname: string | null
  setPath: (pathname: string, previousPathname?: string | null) => void
}

export const useBrowserStore = create<BrowserStoreState>((set) => ({
  view: null,
  viewId: null,
  setView(view: string) {
    set({ view })
  },
  previousPathname: null,
  pathname: null,

  setPath(pathname, previousPathname = null) {
    set({ pathname, previousPathname })
  },
}))

interface DataStoreState {
  notebooksMap: Record<string, any>
  authorsMap: Record<string, any>
  collectionsMap: Record<string, any>
  tutorialsMap: Record<string, any>
  getNotebookByName: (name: string) => any
  getAuthorByName: (name: string) => any
  getCollectionByName: (name: string) => any
  getTutorialByName: (name: string) => any
  setData: (data: {
    notebooksMap: Record<string, any>
    authorsMap: Record<string, any>
    collectionsMap: Record<string, any>
    tutorialsMap: Record<string, any>
  }) => void
  isReady: boolean
}

export const useDataStore = create<DataStoreState>((set, get) => ({
  notebooksMap: {},
  authorsMap: {},
  collectionsMap: {},
  tutorialsMap: {},
  getNotebookByName(name) {
    return get().notebooksMap[name]
  },
  getAuthorByName(name) {
    return get().authorsMap[name]
  },
  getCollectionByName(name) {
    return get().collectionsMap[name]
  },
  getTutorialByName(name) {
    return get().tutorialsMap[name]
  },
  setData({ notebooksMap, authorsMap, collectionsMap, tutorialsMap }) {
    set({
      notebooksMap,
      authorsMap,
      collectionsMap,
      tutorialsMap,
      isReady: true,
    })
  },
  isReady: false,
}))

interface PersistentStoreState {
  user: User | null | undefined
  token: string | null | undefined
  setAuthenticatedUser: (user: User, token: string) => void
}

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
