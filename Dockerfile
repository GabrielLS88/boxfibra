FROM node:alpine

# Cria e entra na pasta do app
WORKDIR /usr/app

COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 5010


CMD ["node", "index.js"]
