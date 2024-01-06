FROM node:mark
WORKDIR '/app'

COPY package.json .
RUN yarn add
COPY . .
CMD ["yarn", "start"]