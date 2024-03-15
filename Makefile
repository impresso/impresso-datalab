BUILD_TAG ?= latest

run-dev:
	GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	GIT_BUILD_TAG=${BUILD_TAG} \
	GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	GIT_REVISION=$(shell git rev-parse --short HEAD) \
	GIT_REPO=$(shell git config --get remote.origin.url) \
	PATH_PREFIX=/datalab \
	PREFIX_PATHS=true \
	GATSBY_PATH_PREFIX="" \
	GATSBY_IMPRESSO_API_URL="https://impresso-project.ch/api" \
	yarn start