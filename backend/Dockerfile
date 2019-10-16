FROM node:carbon

WORKDIR /usr/oowlish-test/backend

COPY package.json ./
RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]
