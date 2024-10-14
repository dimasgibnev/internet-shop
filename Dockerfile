FROM node:20.16.0

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/client

RUN npm install

RUN npm run build

WORKDIR /usr/src/app/server

RUN npm install

EXPOSE  3001

CMD ["node", "app.js"]