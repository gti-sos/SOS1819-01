FROM node:10

WORKDIR /usr/src/app

COPY *.json ./
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN npm install
RUN npm install -g bower
RUN bower install --allow-root
COPY . .
EXPOSE 8080
CMD ["npm", "start"]