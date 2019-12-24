FROM node:latest

EXPOSE 8080

RUN useradd -ms /bin/bash nodeuser

USER nodeuser

RUN echo $(id)

RUN mkdir -p /opt

RUN chown -R nodeuser /opt && chmod -R 755 /opt
##RUN chgrp -R 0 /opt && chmod -R g=u /opt

WORKDIR /opt

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/app-root/src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .

RUN yarn install
RUN yarn global add @angular/cli@6.0.8

# add app
COPY . .


CMD [ "yarn", "start" ]
