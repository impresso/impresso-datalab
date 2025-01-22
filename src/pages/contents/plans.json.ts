import { getCollection } from "astro:content"
import {
  AvailablePlans,
  DataFeatureLabels,
  GenericFeatureLabels,
  PlanAvailabilityLabels,
  PlanIconLabels,
  PlanLabels,
  RequirementsLabels,
} from "../../constants"

// https://docs.astro.build/en/guides/endpoints/
export async function GET() {
  const posts = await getCollection("plans")
  const plans = posts.map(({ body, data }) => {
    const { title, icon, plan, features, requirements } = data

    return {
      title,
      icon,
      plan,
      features,
      requirements,
      body,
    }
  })

  return new Response(
    JSON.stringify(
      {
        AvailablePlans,
        PlanLabels,
        DataFeatureLabels,
        PlanAvailabilityLabels,
        PlanIconLabels,
        GenericFeatureLabels,
        RequirementsLabels,
        plans,
      },
      null,
      2
    )
  )
}
