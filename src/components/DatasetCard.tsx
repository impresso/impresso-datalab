import type { FC } from "react"

export type DatasetPeriod = {
  data_partner_institution: string
  media_alias: string
  media_title: string
  time_period: string
  media: string
  medium: string
  copyright_or_copyright_status: string
  permitted_use: string
  minimum_user_plan_required_to_explore_in_the_webapp: string
  minimum_user_plan_required_to_export_transcripts: string
  minimum_user_plan_required_to_export_illustration: string
  partner_bitmap_index: number
}

type Dataset = {
  title: string
  description: string
  periods: DatasetPeriod[]
}

export type DatasetCardProps = {
  dataset: Dataset
}

const DatasetPeriodCard: FC<{ period: DatasetPeriod; className?: string }> = ({
  period,
  className = "",
}) => {
  return (
    <div
      className={`DatasetPeriodCard shadow-sm bg-white border-radius-sm ${className}`}
    >
      <h3 className="font-size-inherit">
        {period.media_title}
        &mdash; {period.data_partner_institution}
      </h3>
      <div className="d-flex">
        <p>{period.time_period}</p>
        <div>
          {period.media}
          <br />
          {period.medium}
        </div>
      </div>
      <div>{period.permitted_use}</div>
    </div>
  )
}

const DatasetCard: FC<DatasetCardProps> = ({ dataset }) => {
  return (
    <div className="DatasetCard">
      <h2>{dataset.title}</h2>
      <p>{dataset.description}</p>

      {dataset.periods.map((period, index) => (
        <DatasetPeriodCard key={index} period={period} className="p-2 m-1" />
      ))}
    </div>
  )
}

export default DatasetCard
