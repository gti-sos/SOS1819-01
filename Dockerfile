FROM node:10

WORKDIR /usr/src/app

COPY *.json ./
RUN npm install
RUN npm install -g bower
RUN bower install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]