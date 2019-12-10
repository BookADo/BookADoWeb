FROM node:latest

EXPOSE 80

WORKDIR /opt

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/app-root/src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /opt/app-root

RUN npm install
RUN npm install -g @angular/cli@6.0.8

# add app
COPY src /opt/app-root


CMD [ "npm", "start" ]
