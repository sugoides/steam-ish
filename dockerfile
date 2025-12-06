# Use an official Node.js runtime as a parent image.
# Alpine Linux is used for a smaller image size.
FROM node:20-alpine

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies using npm ci for deterministic builds
RUN npm ci

# Copy the rest of your application's source code
COPY . .

# The app listens on port 3000, so expose it
EXPOSE 3000

# The command to run when the container starts
CMD [ "node", "server.js" ]