FROM node:latest

WORKDIR /BookADoWeb

# add `/app/node_modules/.bin` to $PATH
ENV PATH /BookADoWeb/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /BookADoWeb/package.json
RUN npm install
RUN npm install -g @angular/cli@6.0.8

# add app
COPY . /BookADoWeb

RUN PWD
RUN npm start
