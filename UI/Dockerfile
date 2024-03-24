# stage 1

FROM node:alpine AS my-app-build
WORKDIR /app
COPY UI/ .
RUN npm i --legacy-peer-deps && npm run build

# stage 2

FROM nginx:alpine
COPY --from=my-app-build /app/dist/register-ui /usr/share/nginx/html
EXPOSE 80
