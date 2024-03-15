import { use } from "marked"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

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

export const useBrowserStore = create((set) => ({
  view: null,
  viewId: null,
  setView(view) {
    set({ view })
  },
}))

export const useDataStore = create((set, get) => ({
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

export const usePersistentStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      rememberCredentials: false,
      setAuthenticatedUser(user, token) {
        set({ user, token })
      },
      reset() {
        localStorage.removeItem("feathers-jwt")
        set({ user: null, token: null })
      },
      patchUser(user) {
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
const existingToken = localStorage.getItem("feathers-jwt")

if (existingToken && usePersistentStore.getState().token === null) {
  console.info("[usePersistentStore] use existing token from feathers-jwt")
  usePersistentStore.setState({ token: existingToken })
} else {
  console.info("[usePersistentStore] use fresh token")
}
