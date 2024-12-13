export type Group = {
  name: string
  id: number
}
export type Author = {
  id: string
  name: string
  fullName?: string
}

export type Notebook = {
  id: string
  href: string
  title: string
  langModel?: string
  excerpt?: string
  githubUrl?: string
  googleColabUrl?: string
  sha?: string
  levels: {
    coding: string
    method: string
  }
  authors: Author[]
  date?: Date
  seealso?: Notebook[]
  showLinks?: boolean
  links?: { label: string; href: string }[]
}

export interface Series {
  title: string
  excerpt: string
  body?: string
  cover?:
    | {
        url: string
        alt: string
      }
    | null
    | undefined
  category?: string[]
  position?: string
  notebooks: Notebook[]
}

export type User = {
  username: string
  isStaff: boolean
  firstname?: string
  lastname?: string
  pattern?: string
  email?: string
  profile?: {
    pattern: string[]
  }
  bitmap?: string
  groups?: Group[]
  agreedToTerms?: boolean
}

export type Dataset = {
  id: string
  associatedPartner: string
  mediaId: string
  mediaTitle: string
  timePeriod: string
  startYear: number
  endYear: number
  media: string
  medium: string
  copyright: string
  permittedUse: string
  minimumUserPlanRequiredToExploreInWebapp: string
  minimumUserPlanRequiredToExportTranscripts: string
  minimumUserPlanRequiredToExportIllustration: string
  partnerBitmapIndex: number
}

export type CellInfo = {
  cellNumber: number
  cellType: string
  content: string
  idx: number
  l: number
  //  headingLevel
  hl?: number
  h: string
}

// see values in constants
export enum Plans {
  PlanGuest = "guest",
  PlanImpressoUser = "plan-basic",
  PlanEducational = "plan-student",
  PlanResearcher = "plan-academic",
}
