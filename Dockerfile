# https://snyk.io/blog/choosing-the-best-node-js-docker-image
#
# The bullseye image tag maps to Debian 11, which is referred to as Debian’s
# current stable release, and has an estimated end of life date of June 2026.
#
# The official Node.js Docker team also maintains the `slim` image tags that
# explicitly target the tooling needed for a functional Node.js environment
# and nothing else.
FROM node:18.11.0-bullseye-slim
ENV NODE_ENV production
ENV PORT 3000

# Create app directory in the container
WORKDIR /home/node/app

# Copy files & install prod only dependencies
COPY package*.json .
RUN npm ci --only=production
RUN npm prune --production
COPY --chown=node:node . .

# Serve the app
USER node
EXPOSE $PORT
CMD ["node", "src/index.js"]
