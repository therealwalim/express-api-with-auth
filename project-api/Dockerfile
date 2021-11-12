#  Dockerfile for Node Express Backend
FROM node:10.16-alpine

# Create App Directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY --chown=node:node . .

# Exports
EXPOSE 8080

CMD ["npm","start"]