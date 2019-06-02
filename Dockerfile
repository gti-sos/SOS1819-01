FROM node:10

WORKDIR /usr/src/app

COPY *.json ./
RUN npm install --unsafe-perm --production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]