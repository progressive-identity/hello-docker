# Build stage
FROM node:18.15.0-alpine3.17 AS build

WORKDIR /app
COPY package*.json ./
# Install dependencies, including devDependencies needed for npm run build
RUN npm ci
# See .dockerignore to see files which are included
COPY . .
RUN npm run build


# Runtime stage
FROM node:18.15.0-alpine3.17

WORKDIR /app
COPY package*.json ./
# Install dependencies, excluding devDependencies not needed for running the application
RUN npm ci --only=production
# Copu built files from build stage
COPY --from=build /app/dist dist
WORKDIR /app/dist
# Switch to user 'node'
RUN chown -R node:node /app
USER node
# Env variables
ENV HOST='0.0.0.0'
ENV API_PORT=8080
EXPOSE 8080
CMD [ "node", "index.js" ]
