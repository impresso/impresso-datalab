BUILD_TAG ?= latest

# Common build arguments
GIT_COMMIT_SHA = $(shell git rev-parse --short HEAD)
GIT_TAG = $(shell git describe --tags --abbrev=0 HEAD)
GIT_BRANCH = $(shell git rev-parse --abbrev-ref HEAD)
BUILD_DATE = $(shell date -u +'%Y-%m-%dT%H:%M:%SZ')
GIT_REMOTE = $(shell git config --get remote.origin.url)

# Common environment variables
COMMON_ENV = \
	PUBLIC_GIT_COMMIT_SHA=$(GIT_COMMIT_SHA) \
	PUBLIC_GIT_TAG=$(GIT_TAG) \
	PUBLIC_VERSION=${BUILD_TAG} \
	PUBLIC_GIT_BRANCH=$(GIT_BRANCH) \
	PUBLIC_BUILD_DATE=$(BUILD_DATE) \
	PUBLIC_GIT_REMOTE=$(GIT_REMOTE)

# API configuration
API_ENV = \
	PUBLIC_IMPRESSO_API_PATH="/public-api/v1" \
	PUBLIC_IMPRESSO_WS_API_PATH="/socket.io" \
	PUBLIC_IMPRESSO_DATALAB_BASE="/datalab" \
	PUBLIC_IMPRESSO_DATALAB_SITE="https://impresso-project.ch"

run-dev:
	$(COMMON_ENV) npm run dev

build-dev:
	$(COMMON_ENV) $(API_ENV) npm run build

build:
	docker build --no-cache --progress=plain -t impresso/impresso-datalab:${BUILD_TAG} \
	--build-arg PUBLIC_GIT_COMMIT_SHA=$(GIT_COMMIT_SHA) \
	--build-arg PUBLIC_GIT_TAG=$(GIT_TAG) \
	--build-arg PUBLIC_VERSION=${BUILD_TAG} \
	--build-arg PUBLIC_GIT_BRANCH=$(GIT_BRANCH) \
	--build-arg PUBLIC_BUILD_DATE=$(BUILD_DATE) \
	--build-arg PUBLIC_GIT_REMOTE=$(GIT_REMOTE) \
	--build-arg PUBLIC_IMPRESSO_API_PATH="/public-api/v1" \
	--build-arg PUBLIC_IMPRESSO_WS_API_PATH="/api/socket.io" \
	--build-arg PUBLIC_IMPRESSO_DATALAB_BASE="/datalab" \
	--build-arg PUBLIC_IMPRESSO_DATALAB_SITE="https://impresso-project.ch" \
	.

.PHONY: run-dev build-dev build