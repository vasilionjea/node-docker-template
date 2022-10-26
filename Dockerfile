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
