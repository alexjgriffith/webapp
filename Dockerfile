FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install nodemon -g

COPY package.json /usr/src/app

RUN npm install


#COPY . /usr/src/app

EXPOSE 8090

CMD ["nodemon","-L","./server.js"]
