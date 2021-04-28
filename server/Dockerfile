FROM node

WORKDIR /server

COPY ./server/package*.json ./

RUN npm install

COPY ./server/out ./out/

COPY ./client/public ./public

CMD ["npm", "start"]