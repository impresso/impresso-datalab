/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly PUBLIC_VERSION: string
  readonly PUBLIC_GIT_COMMIT_SHA: string
  readonly PUBLIC_GIT_REMOTE: string
  readonly PUBLIC_GIT_BRANCH: string
  readonly PUBLIC_GIT_TAG: string
  readonly PUBLIC_BUILD_DATE: string
  readonly PUBLIC_IMPRESSO_DATALAB_BASE: string
  readonly PUBLIC_IMPRESSO_DATALAB_SITE: string
  readonly PUBLIC_IMPRESSO_API_HOST: string
  readonly PUBLIC_IMPRESSO_API_PATH: string
  readonly PUBLIC_IMPRESSO_WS_API_HOST: string
  readonly PUBLIC_IMPRESSO_WS_API_PATH: string
  readonly PUBLIC_DISCUSSION_CHANNEL_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
