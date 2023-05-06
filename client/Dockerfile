FROM --platform=linux/amd64 node:18-alpine as builder
WORKDIR /appdir
ARG VITE_REDIRECT_URI
ARG VITE_SERVER_URL
ARG VITE_CLIENT_ID
ENV VITE_REDIRECT_URI=${VITE_REDIRECT_URI} VITE_SERVER_URL=${VITE_SERVER_URL} VITE_CLIENT_ID=${VITE_CLIENT_ID}
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.24.0-alpine
COPY --from=builder /appdir/dist /var/www
COPY --from=builder /appdir/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]