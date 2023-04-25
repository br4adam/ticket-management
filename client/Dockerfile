FROM --platform=linux/amd64 node:18-alpine as builder
WORKDIR /appdir
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.24.0-alpine
COPY --from=builder /appdir/dist /usr/share/nginx/html
COPY --from=builder /appdir/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]