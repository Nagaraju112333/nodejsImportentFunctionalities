FROM node:16.13.0
WORKDIR /usr/app
RUN npm i -g nodemon
COPY ./package.json .
RUN npm install --force
COPY . .
EXPOSE 8002
CMD npm start
