FROM node:16-alpine as base

RUN npm i -g pnpm

#####

FROM base as deps

WORKDIR /app

ADD package.json pnpm-lock.yaml ./
RUN pnpm install

#####

FROM base as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
ADD package.json pnpm-lock.yaml ./
RUN pnpm prune --prod

#####

FROM base as build

ENV NODE_ENV production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
ADD . .
RUN pnpm build

######

FROM base as deploy

ENV NODE_ENV production
EXPOSE 3000

WORKDIR /app

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .

CMD ["pnpm", "start"]