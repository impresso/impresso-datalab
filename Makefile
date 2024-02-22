BUILD_TAG ?= latest

run-dev:
	GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	GIT_BUILD_TAG=${BUILD_TAG} \
	GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	GIT_REVISION=$(shell git rev-parse --short HEAD) \
	PATH_PREFIX=/datalab \
	PREFIX_PATHS=true \
	yarn start