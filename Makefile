BUILD_TAG ?= latest

run-dev:
	PUBLIC_GIT_COMMIT_SHA=$(shell git rev-parse --short HEAD) \
	PUBLIC_GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	PUBLIC_VERSION=${BUILD_TAG} \
	PUBLIC_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	PUBLIC_BUILD_DATE=$(shell date -u +'%Y-%m-%dT%H:%M:%SZ') \
	PUBLIC_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	PUBLIC_IMPRESSO_API_PATH="/public-api/v1" \
	PUBLIC_IMPRESSO_WS_API_PATH="/api/socket.io" \
	PUBLIC_IMPRESSO_DATALAB_BASE="/datalab" \
	PUBLIC_IMPRESSO_DATALAB_SITE="https://impresso-project.ch" \
	npm run dev

build-dev:
	PUBLIC_GIT_COMMIT_SHA=$(shell git rev-parse --short HEAD) \
	PUBLIC_GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	PUBLIC_VERSION=${BUILD_TAG} \
	PUBLIC_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	PUBLIC_BUILD_DATE=$(shell date -u +'%Y-%m-%dT%H:%M:%SZ') \
	PUBLIC_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	PUBLIC_IMPRESSO_API_PATH="/public-api/v1" \
	PUBLIC_IMPRESSO_WS_API_PATH="/socket.io" \
	PUBLIC_IMPRESSO_DATALAB_BASE="/datalab" \
	PUBLIC_IMPRESSO_DATALAB_SITE="https://impresso-project.ch" \
	npm run build



build:
	docker build --no-cache --progress=plain -t impresso/impresso-datalab:${BUILD_TAG} \
	--build-arg PUBLIC_GIT_COMMIT_SHA=$(shell git rev-parse --short HEAD) \
	--build-arg PUBLIC_GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	--build-arg PUBLIC_VERSION=${BUILD_TAG} \
	--build-arg PUBLIC_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	--build-arg PUBLIC_BUILD_DATE=$(shell date -u +'%Y-%m-%dT%H:%M:%SZ') \
	--build-arg PUBLIC_GIT_REMOTE=$(shell git config --get remote.origin.url) \
	--build-arg PUBLIC_IMPRESSO_API_PATH="/public-api/v1" \
	--build-arg PUBLIC_IMPRESSO_WS_API_PATH="/api/socket.io" \
	--build-arg PUBLIC_IMPRESSO_DATALAB_BASE="/datalab" \
	--build-arg PUBLIC_IMPRESSO_DATALAB_SITE="https://impresso-project.ch" \
	.