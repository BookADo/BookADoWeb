FROM node:latest

WORKDIR /opt

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/app-root/src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npn install
RUN npm install -g @angular/cli@6.0.8

# add app
COPY . /opt

RUN ng start
