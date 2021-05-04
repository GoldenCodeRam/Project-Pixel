FROM node

WORKDIR /loggingServer

COPY ./loggingServer/package.json ./

RUN npm install

COPY ./loggingServer/out ./out

COPY ./client/public ./public

EXPOSE 8080

CMD ["npm", "start"]