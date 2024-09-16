BUILD_TAG ?= latest

run-dev:
	GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	GIT_BUILD_TAG=${BUILD_TAG} \
	GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	GIT_REVISION=$(shell git rev-parse --short HEAD) \
	GIT_REPO=$(shell git config --get remote.origin.url) \
	IMPRESSO_DATALAB_SITE="https://impresso-project.ch/api/datalab" \
	IMPRESSO_API_URL="https://impresso-project.ch/api" \
	npm run dev

build-dev:
	GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	GIT_BUILD_TAG=${BUILD_TAG} \
	GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	GIT_REVISION=$(shell git rev-parse --short HEAD) \
	GIT_REPO=$(shell git config --get remote.origin.url) \
	PUBLIC_IMPRESSO_DATALAB_BASE="/datalab" \
	PUBLIC_IMPRESSO_DATALAB_SITE="https://impresso-project.ch/api/datalab" \
	npm run build



build:
	docker build --no-cache --progress=plain -t impresso/impresso-datalab:${BUILD_TAG} \
	--build-arg GIT_REVISION=$(shell git rev-parse --short HEAD) \
	--build-arg GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	--build-arg GIT_BUILD_TAG=${BUILD_TAG} \
	--build-arg GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	--build-arg BUILD_DATE=$(shell date -u +'%Y-%m-%dT%H:%M:%SZ') \
	--build-arg GIT_REPO=$(shell git config --get remote.origin.url) \
	--build-arg IMPRESSO_DATALAB_BASE="/datalab" \
	--build-arg IMPRESSO_DATALAB_SITE="https://impresso-project.ch/datalab" \
	.