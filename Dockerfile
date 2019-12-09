FROM node:latest

DEV_MODE=true

RUN npm install
RUN npm cache clean && rm -rf ~/.npm

WORKDIR /opt/
RUN ng start
