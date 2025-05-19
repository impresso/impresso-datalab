export const CanonicalUrl =
  typeof import.meta !== "undefined" &&
  import.meta.env?.PUBLIC_IMPRESSO_DATALAB_SITE
    ? import.meta.env?.PUBLIC_IMPRESSO_DATALAB_SITE
    : "https://impresso-project.ch"

export const WsApiPath =
  typeof import.meta !== "undefined" &&
  import.meta.env?.PUBLIC_IMPRESSO_WS_API_PATH
    ? import.meta.env?.PUBLIC_IMPRESSO_WS_API_PATH
    : "/mock-socket.io"

export const RequirementToU = "terms-of-use"
export const RequirementImpressoAccount = "impresso-account"
export const RequirementProofStudentEnrollment = "proof-of-student-enrollment"
export const RequirementProofAcademicAffiliation =
  "proof-of-academic-affiliation"
export const RequirementDataAccessGranted = "data-access-granted"

export const Requirements: string[] = [
  RequirementToU,
  RequirementImpressoAccount,
  RequirementProofStudentEnrollment,
  RequirementProofAcademicAffiliation,
  RequirementDataAccessGranted,
]

export const RequirementsLabels: Record<string, string> = {
  [RequirementToU]: "Agreement to Terms of Use",
  [RequirementImpressoAccount]: "Impresso Account creation",
  [RequirementProofStudentEnrollment]:
    "Proof of enrollment in higher education (for students)",
  [RequirementProofAcademicAffiliation]: "Proof of academic affiliation",
  [RequirementDataAccessGranted]:
    "Account creation request must receive approval from content provider",
}

export const RequirementsTooltips: Record<string, string> = {
  [RequirementToU]: "You must agree to the Terms of Use.",
  [RequirementImpressoAccount]:
    "You must create an Impresso account. Always use an <b>institution email</b> if available",
  [RequirementProofStudentEnrollment]:
    "You must create an Impresso account using your <b>institution email address</b>.",
  [RequirementProofAcademicAffiliation]:
    "You must create an Impresso account using your <b>institution email address</b> AND <b>an institutional profile page</b>",
  [RequirementDataAccessGranted]:
    "Your special membership creation request must be approved by the content provider for data access.",
}

export const GenericFeatureExploreAll = "explore-all-features"
export const GenericFeatureCreateStoreExportCollections =
  "create-store-export-collections"
export const GenericFeatureGenerateApiKeys = "generate-api-keys"

export const GenericFeatures: string[] = [
  GenericFeatureExploreAll,
  GenericFeatureCreateStoreExportCollections,
  GenericFeatureGenerateApiKeys,
]

export const GenericFeatureLabels: Record<string, string> = {
  [GenericFeatureExploreAll]:
    "Explore all features of the Impresso Web App and Datalab.",
  [GenericFeatureCreateStoreExportCollections]:
    "Create, store and export personal collections.",
  [GenericFeatureGenerateApiKeys]:
    "Generate API keys to access parts of our corpus via the Impresso Datalab.",
}
export const DataFeatureMetadata = "metadata"
export const DataFeatureMetadataPublicDomain = "metadata-public-domain"
export const DataFeatureFacsimiles = "facsimiles"
export const DataFeatureFacsimilesPublicDomain = "facsimiles-public-domain"
export const DataFeatureAudio = "audio"
export const DataFeatureAudioPublicDomain = "audio-public-domain"
export const DataFeatureTranscripts = "transcripts"
export const DataFeatureTranscriptsPublicDomain = "transcripts-public-domain"
export const DataFeatureImages = "images"
export const DataFeatureImagesPublicDomain = "images-public-domain"
export const DataFeatureSemanticEnrichments = "semantic-enrichments"
export const DataFeatureSemanticEnrichmentsPublicDomain =
  "semantic-enrichments-public-domain"

export const DataFeatures: string[] = [
  DataFeatureMetadataPublicDomain,
  DataFeatureMetadata,
  DataFeatureFacsimilesPublicDomain,
  DataFeatureFacsimiles,
  DataFeatureAudioPublicDomain,
  DataFeatureAudio,
  DataFeatureTranscriptsPublicDomain,
  DataFeatureTranscripts,
  DataFeatureImagesPublicDomain,
  DataFeatureImages,
  DataFeatureSemanticEnrichmentsPublicDomain,
  DataFeatureSemanticEnrichments,
]

export const ExportFeatureMetadata = "export-metadata"
export const ExportFeatureMetadataPublicDomain = "export-metadata-public-domain"
export const ExportFeatureFacsimiles = "export-facsimiles"
export const ExportFeatureFacsimilesPublicDomain =
  "export-facsimiles-public-domain"
export const ExportFeatureAudio = "export-audio"
export const ExportFeatureAudioPublicDomain = "export-audio-public-domain"
export const ExportFeatureTranscripts = "export-transcripts"
export const ExportFeatureTranscriptsPublicDomain =
  "export-transcripts-public-domain"
export const ExportFeatureImages = "export-images"
export const ExportFeatureImagesPublicDomain = "export-images-public-domain"
export const ExportFeatureSemanticEnrichments = "export-semantic-enrichments"
export const ExportFeatureSemanticEnrichmentsPublicDomain =
  "semantic-enrichments-public-domain"

export const ExportFeatures: string[] = [
  ExportFeatureMetadataPublicDomain,
  ExportFeatureMetadata,
  ExportFeatureFacsimilesPublicDomain,
  ExportFeatureFacsimiles,
  ExportFeatureAudioPublicDomain,
  ExportFeatureAudio,
  ExportFeatureTranscriptsPublicDomain,
  ExportFeatureTranscripts,
  ExportFeatureImagesPublicDomain,
  ExportFeatureImages,
  ExportFeatureSemanticEnrichmentsPublicDomain,
  ExportFeatureSemanticEnrichments,
]

export const ExportFeatureLabels: Record<string, string> = {
  [ExportFeatureMetadata]: "Export Metadata",
  [ExportFeatureMetadataPublicDomain]: "Export Metadata - Public Domain",
  [ExportFeatureFacsimiles]: "Export Facsimiles",
  [ExportFeatureFacsimilesPublicDomain]: "Export Facsimiles - Public Domain",
  [ExportFeatureAudio]: "Export Audio",
  [ExportFeatureAudioPublicDomain]: "Export Audio - Public Domain",
  [ExportFeatureTranscripts]: "Export Transcripts",
  [ExportFeatureTranscriptsPublicDomain]: "Export Transcripts - Public Domain",
  [ExportFeatureImages]: "Export Images",
  [ExportFeatureImagesPublicDomain]: "Export Images - Public Domain",
  [ExportFeatureSemanticEnrichments]: "Export Semantic Enrichments",
  [ExportFeatureSemanticEnrichmentsPublicDomain]:
    "Export Semantic Enrichments - Public Domain",
}

export const DataFeatureLabels: Record<string, string> = {
  [DataFeatureMetadata]:
    "Metadata (bibliographic, descriptive, technical - public and protected domain)",
  [DataFeatureFacsimiles]: "Facsimiles  - Protected Domain",
  [DataFeatureFacsimilesPublicDomain]: "Facsimiles - Public domain",
  [DataFeatureAudio]: "Audio records - Protected Domain",
  [DataFeatureAudioPublicDomain]: "Audio records - Public Domain",

  [DataFeatureTranscripts]: "Transcripts - Protected Domain",
  [DataFeatureTranscriptsPublicDomain]: "Transcripts - Public Domain",

  [DataFeatureImages]:
    "Images (illustrations, photographs, etc.) - Protected Domain",
  [DataFeatureImagesPublicDomain]:
    "Images (illustrations, photographs, etc.) - Public Domain",
  [DataFeatureSemanticEnrichments]:
    "Named entities, text reuse clusters, topics, image classification etc. (for both public and protected data)",
  [DataFeatureSemanticEnrichmentsPublicDomain]:
    "Named entities, text reuse clusters, topics, image classification etc. </br><b>Public Domain</b>",
}

export const Features: string[] = [
  ...GenericFeatures,
  ...DataFeatures,
  ...ExportFeatures,
]

export const PlanGuest = "guest"
export const PlanImpressoUser = "plan-basic"
// IMPRESSO_GROUP_USER_PLAN_EDUCATIONAL = "plan-educational"
// IMPRESSO_GROUP_USER_PLAN_RESEARCHER = "plan-researcher"
export const PlanEducational = "plan-educational"
export const PlanResearcher = "plan-researcher"
export const PlanResearcherPlus = "academic-user-plus"
export const PlanSpecialMembership = "plan-special-membership"
export const PlanNone = "no-plan"
export const PlanLabels: Record<string, string> = {
  [PlanGuest]: "Guest",
  [PlanImpressoUser]: "Basic User",
  [PlanEducational]: "Student User",
  [PlanResearcher]: "Academic User",
  [PlanResearcherPlus]: "Academic User +",
  [PlanNone]: "No Plan",
  [PlanSpecialMembership]: "Special Membership",
}
export const Plans: string[] = [
  PlanGuest,
  PlanImpressoUser,
  PlanEducational,
  PlanResearcher,
  PlanResearcherPlus,
  PlanNone,
  PlanSpecialMembership,
]

export const AvailablePlans = [
  PlanImpressoUser,
  PlanEducational,
  PlanResearcher,
]

export const PlanAvailabilityLabels: Record<string, string> = {
  [PlanGuest]: "Public Domain, always accessible",
  [PlanImpressoUser]: "Feature accessible with a basic account",
  [PlanEducational]: "Feature accessible with a student account",
  [PlanResearcher]: "Feature accessible with an academic account",
  [PlanResearcherPlus]: "Feature accessible with an academic account",
  [PlanNone]: "Feature not accessible",
}

export const PlanIconRestrictedAccessNoDownload =
  "restricted-only-access-no-download"
export const PlanIconRestrictedAccessDownload =
  "restricted-only-access-download"
export const PlanIconPublicDomainAccessNoDownload =
  "public-domain-only-access-no-download"
export const PlanIcons: string[] = [
  PlanIconRestrictedAccessNoDownload,
  PlanIconRestrictedAccessDownload,
  PlanIconPublicDomainAccessNoDownload,
]
export const PlanIconLabels: Record<string, string> = {
  [PlanIconRestrictedAccessNoDownload]:
    "Access to protected data determined only by Impresso partners. <b>No download possible<b>",
  [PlanIconRestrictedAccessDownload]:
    "Access and download to protected data determined only by Impresso partners.",
  [PlanIconPublicDomainAccessNoDownload]:
    "Access Granted, <b>Download Not Available<b>",
}

export const PlanIconColors: Record<string, string> = {
  [PlanIconRestrictedAccessNoDownload]: "orange",
  [PlanIconRestrictedAccessDownload]: "purple",
  [PlanIconPublicDomainAccessNoDownload]: "purple",
}

export const BrowserViewLogin = "login"
export const BrowserViewRegister = "signup"
export const BrowserViewConfirmRegistration = "confirm-registration"
export const BrowserViewTermsOfUse = "terms-of-use"
export const BrowserViewProfile = "profile"
export const BrowserViewChangePassword = "change-password"
export const BrowserViewConfirmChangePassword = "confirm-change-password"
export const BrowserViewChangePlanRequest = "change-plan-request"
export const BrowserViewConfirmChangePlanRequest = "confirm-change-plan-request"
export const BrowserViews: string[] = [
  BrowserViewLogin,
  BrowserViewRegister,
  BrowserViewProfile,
  BrowserViewChangePassword,
  BrowserViewConfirmChangePassword,
  BrowserViewChangePlanRequest,
  BrowserViewConfirmRegistration,
]

export const BrowserWsStatusIdle = "idle"
export const BrowserWsStatusConnecting = "connecting"
export const BrowserWsStatusConnected = "connected"
export const BrowserWsStatusClosed = "closed"

export const AccessTokenKey = "feathers-jwt"
export const BrowserWsStatuses: string[] = [
  BrowserWsStatusIdle,
  BrowserWsStatusConnecting,
  BrowserWsStatusConnected,
  BrowserWsStatusClosed,
]

export const SeriesCategoryTutorials = "tutorials"
export const SeriesCategoryExplorations = "explorations"
export const SeriesCategoryLLMs = "llms"

export const SeriesCategories: string[] = [
  SeriesCategoryTutorials,
  SeriesCategoryExplorations,
  SeriesCategoryLLMs,
]

export const SeriesPositionLeadingColumn = "leading-column"
export const SeriesPositionCentralColumn = "central-column"
export const SeriesPositionTrailingColumn = "trailing-column"

export const SeriesPositions: string[] = [
  SeriesPositionLeadingColumn,
  SeriesPositionCentralColumn,
  SeriesPositionTrailingColumn,
]

export const ModelLanguagesLabels: Record<string, string> = {
  en: "English",
  fr: "French",
  de: "German",
  it: "Italian",
  "en-fr-de": "English, French, German",
}

export const NotebookLevelBeginner = "beginner"
export const NotebookLevelApprentice = "apprentice"
export const NotebookLevelIntermediate = "intermediate"
export const NotebookLevelAdvanced = "advanced"

export const NotebookLevels = [
  NotebookLevelBeginner,
  NotebookLevelApprentice,
  NotebookLevelIntermediate,
  NotebookLevelAdvanced,
]

export const NotebookLevelLabels: Record<string, string> = {
  [NotebookLevelBeginner]: "Beginner",
  [NotebookLevelApprentice]: "Apprentice",
  [NotebookLevelIntermediate]: "Intermediate",
  [NotebookLevelAdvanced]: "Advanced",
}

export const NotebookLevelColors: Record<string, string[]> = {
  [NotebookLevelBeginner]: ["#98FB98", "#c7EA46"],
  [NotebookLevelApprentice]: ["#29AB87", "#C7EA46"],
  [NotebookLevelIntermediate]: ["#01796F", "#29AB87"],
  [NotebookLevelAdvanced]: ["#87015a"],
}
