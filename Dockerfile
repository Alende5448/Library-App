FROM node:16-alpine

WORKDIR /myapp

COPY package.json /myapp

RUN yarn install

COPY . /myapp

EXPOSE 4000

CMD ["yarn", "dev"]
