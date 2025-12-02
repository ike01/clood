FROM node:18-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install build tools for any native dependencies
RUN apk add --no-cache python3 make g++ bash curl

# Copy project files
COPY serverless.yml package.json package-lock.json ./
COPY . /app

# Increase npm fetch timeout (optional)
RUN npm config set fetch-timeout 60000
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-factor 10

# Install dependencies
RUN npm ci --legacy-peer-deps
RUN npm install serverless@3.11.0 --legacy-peer-deps

EXPOSE 4100

# Start Serverless Offline
CMD ["npx", "serverless", "offline", "start", "--host", "0.0.0.0"]
