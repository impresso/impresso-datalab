import { getCollection, getEntry } from "astro:content"
import {
  AvailablePlans,
  DataFeatureAudio,
  DataFeatureAudioPublicDomain,
  DataFeatureFacsimiles,
  DataFeatureFacsimilesPublicDomain,
  DataFeatureImages,
  DataFeatureImagesPublicDomain,
  DataFeatureLabels,
  DataFeatureMetadata,
  DataFeatureMetadataPublicDomain,
  DataFeatureSemanticEnrichments,
  DataFeatureSemanticEnrichmentsPublicDomain,
  DataFeatureTranscripts,
  DataFeatureTranscriptsPublicDomain,
  ExportFeatureAudio,
  ExportFeatureAudioPublicDomain,
  ExportFeatureFacsimiles,
  ExportFeatureFacsimilesPublicDomain,
  ExportFeatureImages,
  ExportFeatureImagesPublicDomain,
  ExportFeatureLabels,
  ExportFeatureMetadata,
  ExportFeatureMetadataPublicDomain,
  // ExportFeatures,
  ExportFeatureSemanticEnrichments,
  ExportFeatureSemanticEnrichmentsPublicDomain,
  ExportFeatureTranscripts,
  ExportFeatureTranscriptsPublicDomain,
  GenericFeatureCreateStoreExportCollections,
  GenericFeatureExploreAll,
  GenericFeatureGenerateApiKeys,
  GenericFeatureLabels,
  PlanAvailabilityLabels,
  PlanEducational,
  PlanGuest,
  PlanIconLabels,
  PlanIconPublicDomainAccessNoDownload,
  PlanIconRestrictedAccessDownload,
  PlanIconRestrictedAccessNoDownload,
  PlanImpressoUser,
  PlanLabels,
  PlanNone,
  PlanResearcher,
  PlanResearcherPlus,
  PlanSpecialMembership,
  RequirementDataAccessGranted,
  RequirementImpressoAccount,
  RequirementProofAcademicAffiliation,
  RequirementProofStudentEnrollment,
  RequirementsLabels,
  RequirementToU,
} from "../../constants"

// https://docs.astro.build/en/guides/endpoints/
export async function GET() {
  const posts = await getCollection("plans")
  const planContent = await getEntry("pagesContents", "plans")
  const plans = posts
    .map(({ body, data }) => {
      const { title, icon, plan, features, requirements, ordering } = data

      return {
        title,
        icon,
        id: plan,
        ordering,
        features,
        requirements,
        body,
      }
    })
    .sort((a, b) => {
      return a.ordering - b.ordering
    })

  return new Response(
    JSON.stringify(
      {
        values: {
          RequirementToU,
          RequirementImpressoAccount,
          RequirementProofStudentEnrollment,
          RequirementProofAcademicAffiliation,
          RequirementDataAccessGranted,
          GenericFeatureExploreAll,
          GenericFeatureCreateStoreExportCollections,
          GenericFeatureGenerateApiKeys,
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
          PlanIconRestrictedAccessNoDownload,
          PlanIconRestrictedAccessDownload,
          PlanIconPublicDomainAccessNoDownload,
          PlanGuest,
          PlanImpressoUser,
          PlanEducational,
          PlanResearcher,
          PlanResearcherPlus,
          PlanNone,
          PlanSpecialMembership,
        },
        AvailablePlans,
        PlanLabels,
        DataFeatureLabels,
        PlanAvailabilityLabels,
        PlanIconLabels,
        GenericFeatureLabels,
        RequirementsLabels,
        ExportFeatureLabels,
        plans,
        planContent: {
          ...planContent?.data,
          body: planContent?.body,
        },
      },
      null,
      2
    )
  )
}
