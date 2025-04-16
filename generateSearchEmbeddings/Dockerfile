
# Use an official Node.js image with Python & build tools preinstalled
FROM node:18-bullseye

# Set the working directory inside the container
WORKDIR /app

# Install Python and other dependencies required by node-gyp
RUN apt-get update && apt-get install -y python3 python3-pip build-essential && \
    ln -sf /usr/bin/python3 /usr/bin/python

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies, including TensorFlow.js
RUN npm install @tensorflow-models/universal-sentence-encoder @tensorflow/tfjs-node

# Copy the remaining project files
COPY index.js .

# Run the embedding generation script
CMD ["node", "index.js"]