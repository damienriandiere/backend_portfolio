FROM node:20.12.2-alpine3.19

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/src/app

COPY package*.json /usr/src/app


RUN pnpm install

COPY . /usr/src/app

EXPOSE 3000
CMD ["pnpm", "start"]