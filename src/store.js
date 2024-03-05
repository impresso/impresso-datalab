import { create } from 'zustand'

export const ModalDraftView = 'draft'
export const ModalForkNotebookView = 'fork-notebook'
export const ModalNotebookPreviewView = 'notebook-preview'
export const ModalLoginView = 'login'

export const AvailableModalsViews = [
  ModalDraftView,
  ModalForkNotebookView,
  ModalNotebookPreviewView,
  ModalLoginView,
]

export const useBrowserStore = create((set) => ({
  view: null,
  setView(view) {
    set({ view })
  },
}))
