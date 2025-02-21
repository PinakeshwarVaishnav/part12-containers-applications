FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BACKEND_URL
ENV VITE_BACKEND_URL=$BACKEND_URL

RUN npm run build

FROM nginx:alpine

EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html
