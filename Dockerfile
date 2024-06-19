FROM node:22.2.0-alpine3.20 AS gatsby

# 	docker build --no-cache --progress=plain -t impresso/impresso-datalab:${BUILD_TAG} \
	# --build-arg GIT_REVISION=$(shell git rev-parse --short HEAD) \
	# --build-arg GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	# --build-arg GIT_BUILD_TAG=${BUILD_TAG} \
	# --build-arg GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	# --build-arg BUILD_DATE=$(shell date -u +'%Y-%m-%dT%H:%M:%SZ') \
	# --build-arg GIT_REPO=$(shell git config --get remote.origin.url) .

ARG GIT_REVISION
ARG GIT_TAG
ARG GIT_BUILD_TAG
ARG GIT_BRANCH
ARG BUILD_DATE
ARG GIT_REPO

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src /app/src
COPY static /app/static
COPY utils /app/utils

COPY createfontscss.js /app/createfontscss.js
COPY updatenotebooks.js /app/updatenotebooks.js
COPY gatsby-config.js /app/gatsby-config.js
COPY gatsby-node.js /app/gatsby-node.js
COPY gatsby-ssr.js /app/gatsby-ssr.js
COPY gatsby-browser.js /app/gatsby-browser.js

ENV GIT_REVISION=${GIT_REVISION}
ENV GIT_TAG=${GIT_TAG}
ENV GIT_BUILD_TAG=${GIT_BUILD_TAG}
ENV GIT_BRANCH=${GIT_BRANCH}
ENV BUILD_DATE=${BUILD_DATE}
ENV GIT_REPO=${GIT_REPO}
ENV GATSBY_PATH_PREFIX="/datalab"
ENV GATSBY_IMPRESSO_API_URL="/api"

RUN yarn build

# Install and run pagefind
RUN npx pagefind@v1.1.0 --site /app/public --verbose

# copy all files built by gatsy to busybox
FROM busybox:stable
WORKDIR /app
COPY --from=gatsby /app/public .

RUN ls -la
