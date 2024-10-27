export const CanonicalUrl =
  typeof import.meta !== "undefined" &&
  import.meta.env?.PUBLIC_IMPRESSO_DATALAB_SITE
    ? import.meta.env?.PUBLIC_IMPRESSO_DATALAB_SITE
    : "https://impresso-project.ch"

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
  [RequirementImpressoAccount]: "Creation of an Impresso Account",
  [RequirementProofStudentEnrollment]:
    "Proof of current student enrollment in higher education",
  [RequirementProofAcademicAffiliation]: "Proof of academic affiliation",
  [RequirementDataAccessGranted]:
    "Data access requires approval by content provider",
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
  DataFeatureMetadata,
  DataFeatureMetadataPublicDomain,
  DataFeatureFacsimiles,
  DataFeatureFacsimilesPublicDomain,
  DataFeatureAudio,
  DataFeatureAudioPublicDomain,
  DataFeatureTranscripts,
  DataFeatureTranscriptsPublicDomain,
  DataFeatureImages,
  DataFeatureImagesPublicDomain,
  DataFeatureSemanticEnrichments,
  DataFeatureSemanticEnrichmentsPublicDomain,
]

export const DataFeatureLabels: Record<string, string> = {
  [DataFeatureMetadata]: "Bibliographic Metadata",
  [DataFeatureMetadataPublicDomain]:
    "Bibliographic Metadata </br><b>public domain</b>",
  [DataFeatureFacsimiles]:
    "Facsimiles - images of documents created during scanning",
  [DataFeatureFacsimilesPublicDomain]:
    "Facsimiles - images of documents created during scanning </br><b>public domain</b>",
  [DataFeatureAudio]: "Audio - mostly spoken word radio, mostly no music",
  [DataFeatureAudioPublicDomain]:
    "Audio - mostly spoken word radio, mostly no music </br><b>public domain</b>",

  [DataFeatureTranscripts]: "Transcripts - e.g. radio speaker notes",
  [DataFeatureTranscriptsPublicDomain]:
    "Transcripts - e.g. radio speaker notes </br><b>public domain</b>",

  [DataFeatureImages]:
    "Images - e.g. those published by newspapers or radio magazines.",
  [DataFeatureImagesPublicDomain]:
    "Images - e.g. those published by newspapers or radio magazines </br><b>public domain</b>",
  [DataFeatureSemanticEnrichments]:
    "Semantic enrichments generated by Impresso, e.g. named entities, text reuse clusters, topics, image classification etc.",
  [DataFeatureSemanticEnrichmentsPublicDomain]:
    "Semantic enrichments generated by Impresso, e.g. named entities, text reuse clusters, topics, image classification etc. </br><b>public domain</b>",
}

export const Features: string[] = [...GenericFeatures, ...DataFeatures]

export const PlanGuest = "guest"
export const PlanImpressoUser = "impresso-user"
export const PlanStudentUser = "student-user"
export const PlanAcademicUser = "academic-user"
export const PlanAcademicUserPlus = "academic-user-plus"
export const PlanLabels: Record<string, string> = {
  [PlanGuest]: "Guest",
  [PlanImpressoUser]: "No academic affiliation",
  [PlanStudentUser]: "Student",
  [PlanAcademicUser]: "Academic",
  [PlanAcademicUserPlus]: "Academic User Plus",
}

export const BrowserViewLogin = "login"
export const BrowserViewRegister = "signup"
export const BrowserViewConfirmRegistration = "confirm-registration"
export const BrowserViewTermsOfUse = "terms-of-use"
export const BrowserViews: string[] = [BrowserViewLogin, BrowserViewRegister]

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
