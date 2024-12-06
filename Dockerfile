FROM node:22 AS builder

ARG PUBLIC_VERSION
ARG PUBLIC_GIT_TAG
ARG PUBLIC_GIT_BRANCH
ARG PUBLIC_GIT_COMMIT_SHA
ARG PUBLIC_BUILD_DATE
ARG PUBLIC_GIT_REMOTE
ARG PUBLIC_IMPRESSO_DATALAB_SITE
ARG PUBLIC_IMPRESSO_DATALAB_BASE
ARG PUBLIC_IMPRESSO_API_PATH
ARG PUBLIC_IMPRESSO_WS_API_PATH

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY public ./public
COPY src ./src
COPY astro.config.mjs ./
COPY .storybook ./.storybook
COPY createfontscss.js ./
COPY .prettierrc ./
COPY tsconfig.json ./
# Set environment variables from args=$
ENV PUBLIC_VERSION=$PUBLIC_VERSION
ENV PUBLIC_GIT_TAG=$PUBLIC_GIT_TAG
ENV PUBLIC_GIT_BRANCH=$PUBLIC_GIT_BRANCH
ENV PUBLIC_GIT_COMMIT_SHA=$PUBLIC_GIT_COMMIT_SHA
ENV PUBLIC_BUILD_DATE=$PUBLIC_BUILD_DATE
ENV PUBLIC_GIT_REMOTE=$PUBLIC_GIT_REMOTE
ENV PUBLIC_IMPRESSO_DATALAB_SITE=$PUBLIC_IMPRESSO_DATALAB_SITE
ENV PUBLIC_IMPRESSO_DATALAB_BASE=$PUBLIC_IMPRESSO_DATALAB_BASE
ENV PUBLIC_IMPRESSO_API_PATH=$PUBLIC_IMPRESSO_API_PATH
ENV PUBLIC_IMPRESSO_WS_API_PATH=${PUBLIC_IMPRESSO_WS_API_PATH}

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