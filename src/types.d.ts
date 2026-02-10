import type { Features, PlanIcons } from "./constants"

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
  draft?: boolean
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
  firstname: string
  lastname: string
  pattern: string
  email: string
  profile?: {
    pattern: string[]
  }
  bitmap?: string
  groups?: Group[]
  agreedToTerms?: boolean
  affiliation?: string
  institutionalUrl?: string
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

export type UserChangePlanRequest = {
  id: string
  dateCreated: string
  dateLastModified: string
  status: "pending" | "approved" | "rejected"
  plan: {
    id: string
    name: string
  }
}
// see values in constants
export enum Plans {
  PlanGuest = "guest",
  PlanImpressoUser = "plan-basic",
  PlanEducational = "plan-student",
  PlanResearcher = "plan-academic",
}

export type PlanFeature = {
  title: string
  status: string
  iconColor: string
  icon?: (typeof PlanIcons)[number]
  ref?: (typeof Features)[number]
}

export type Plan = {
  id: string
  name: string
  title: string
  body: string
  features: PlanFeature[]
  ordering: number
  requirements: string[]
  icon: string
  collection?: string
  href?: string
}

export type SpecialMembershipAccessItem = {
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

export type CorpusAccessCatalogueItem = {
  data_partner_institution: string
  media_alias: string
  media_title: string
  time_period: string
  source_type: string
  source_medium: string
  copyright_or_copyright_status: string
  permitted_use: string
  minimum_user_plan_required_to_explore_in_the_webapp: string
  minimum_user_plan_required_to_export_transcripts: string
  minimum_user_plan_required_to_export_illustration: string
  partner_bitmap_index: number
}

export type DataReleaseCard = {
  id: string
  releaseName: string
  releaseVersion: string
  impressoCorpusOverview: {
    npsStats: {
      titles: number
      issues: number
      pages: number
      contentItems: number
      images: number
      tokens: number
    }
  }
  impressoEnrichments: {
    lingproc: {
      models: any[]
      enrichmentStats?: any
    }
    langident: {
      models: any[]
      enrichmentStats?: any
    }
    textreuse: {
      models: any[]
      enrichmentStats?: any
    }
    entities: {
      models: any[]
      enrichmentStats?: any
    }
    newsagencies: {
      models: any[]
      enrichmentStats?: any
    }
    topics: {
      models: any[]
      enrichmentStats?: any
    }
    ocrqa: {
      models: any[]
      enrichmentStats?: any
    }
    embImages: {
      models: any[]
      enrichmentStats?: any
    }
    embDocs: {
      models: any[]
      enrichmentStats?: any
    }
  }
}

export type DataProvider = {
  id: string
  title: string
  acronym: string
  type: string
  provider: string
  links?: {
    label: string
    url: string
    access?: "public" | "developer" | "searchable"
  }[]
  Reference?: string
}

export type TOCEntry = {
  id: string
  title: string
  level: number
}
