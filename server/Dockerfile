FROM node

WORKDIR /server

COPY ./package*.json ./

RUN npm install

COPY ./out ./

CMD ["npm", "start"]