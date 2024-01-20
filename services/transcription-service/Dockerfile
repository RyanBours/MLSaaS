FROM node:21 AS development
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
USER node

FROM node:21 AS build
WORKDIR /app
COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
RUN npx prisma generate
RUN npm run build
ENV NODE_ENV production
RUN npm i --only=production && npm cache clean --force
USER node

FROM node:21 AS production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main.js"]