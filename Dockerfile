FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

RUN npm run compile

CMD ["npm", "run", "start"]