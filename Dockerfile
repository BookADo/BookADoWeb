FROM node:latest

WORKDIR /opt

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/app-root/src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli@6.0.8

# add app
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
