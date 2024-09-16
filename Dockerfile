FROM node:22 AS builder

ARG GIT_TAG
ARG GIT_BUILD_TAG
ARG GIT_BRANCH
ARG GIT_REVISION
ARG BUILD_DATE
ARG GIT_REPO
ARG IMPRESSO_DATALAB_SITE
ARG IMPRESSO_DATALAB_BASE

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY public ./public
COPY src ./src
COPY astro.config.mjs ./
COPY .storybook ./.storybook
COPY createfontscss.js ./
COPY .prettierrc ./
COPY tsconfig.json ./
# Set environment variables
ENV GIT_TAG=$GIT_TAG
ENV GIT_BUILD_TAG=$GIT_BUILD_TAG
ENV GIT_BRANCH=$GIT_BRANCH
ENV GIT_REVISION=$GIT_REVISION
ENV BUILD_DATE=$BUILD_DATE
ENV GIT_REPO=$GIT_REPO
ENV PUBLIC_IMPRESSO_DATALAB_SITE=$IMPRESSO_DATALAB_SITE
ENV PUBLIC_IMPRESSO_DATALAB_BASE=$IMPRESSO_DATALAB_BASE

# Build the Astro site for production
RUN npm run build

# Stage 2: Use busybox to serve the files
FROM busybox:1.36 AS production

# Set working directory
WORKDIR /app

# Copy static files from the build stage
COPY --from=builder /app/dist /app
# List all the files in the directory
RUN ls -la /app