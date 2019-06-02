FROM node:10

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install --global bower
RUN npm install

COPY . .
EXPOSE 8080
CMD ["npm", "start"]