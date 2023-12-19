FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM build AS transcription-service
RUN pnpm deploy --filter=transcription-service --prod /prod/transcription-service
WORKDIR /prod/transcription-service
EXPOSE 4002
CMD [ "node", "dist/main.js" ]

FROM build AS user-service
RUN pnpm deploy --filter=user-service --prod /prod/user-service
WORKDIR /prod/user-service
EXPOSE 4001
CMD [ "node", "dist/main.js" ]

FROM build AS dashboard
RUN pnpm deploy --filter=dashboard --prod /prod/dashboard
ENV NODE_ENV=production
WORKDIR /prod/dashboard
EXPOSE 3000
CMD ["pnpm", "start"]