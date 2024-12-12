export type Group = {
  name: string
  id: number
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

// see values in constants
export enum Plans {
  PlanGuest = "guest",
  PlanImpressoUser = "plan-basic",
  PlanEducational = "plan-student",
  PlanResearcher = "plan-academic",
}
