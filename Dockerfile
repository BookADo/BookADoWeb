FROM node:latest

EXPOSE 8080

RUN useradd -ms /bin/bash user1

RUN mkdir -p /opt

RUN chown -R user1:userGroup /opt && chmod -R 775 /opt

USER user1
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
