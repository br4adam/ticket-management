FROM --platform=linux/amd64 node:18-alpine
WORKDIR /appdir
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
CMD [ "npm", "start" ]