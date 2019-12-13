FROM node:latest

EXPOSE 80

RUN mkdir -p /opt
sRUN chgrp -R 0 /opt && chmod -R g=u /opt
WORKDIR /opt

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/app-root/src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .

RUN yarn install
# RUN yarn global add @angular/cli@6.0.8

# add app
COPY . .


CMD [ "yarn", "start" ]
