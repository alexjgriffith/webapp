FROM node:argon

RUN npm install nodemon -g

WORKDIR /usr/src

COPY app/package.json /usr/src/package.json
RUN npm install
ADD app/nodemon.json /usr/src/nodeomn.json


EXPOSE 8090

CMD npm start
