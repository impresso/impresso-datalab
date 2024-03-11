import { create } from "zustand"

export const ModalDraftView = "draft"
export const ModalForkNotebookView = "fork-notebook"
export const ModalNotebookPreviewView = "notebook-preview"
export const ModalLoginView = "login"

export const AvailableModalsViews = [
  ModalDraftView,
  ModalForkNotebookView,
  ModalNotebookPreviewView,
  ModalLoginView,
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
