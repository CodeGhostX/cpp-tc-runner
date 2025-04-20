# Use official Node.js base image with Debian
FROM node:20-slim

# Install g++ for compiling C++ code
RUN apt-get update && apt-get install -y g++

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy remaining files
COPY . .

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
