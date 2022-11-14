FROM node:16-slim as BUILDER
LABEL maintainer="Miguel Duque Filho"

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /usr/src/app

# Install app dependencies 
COPY package*.json ./
COPY yarn.lock ./
COPY .env ./
COPY tsconfig.json ./

COPY prisma ./prisma/
COPY xsddoc ./xsddoc/
COPY . .

RUN yarn install
RUN yarn prisma generate 

RUN yarn build

FROM node:16-alpine 

ARG NODE_ENV

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app/ ./

EXPOSE 4005

CMD ["yarn", "start:migrate:prod"]

