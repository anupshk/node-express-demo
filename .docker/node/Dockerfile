FROM node:14-alpine as base

WORKDIR /src
COPY ./src/package*.json /src/
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm install --production
# COPY ./src/* /src/
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon sequelize-cli && npm install
ENV PATH=/src/node_modules/.bin:$PATH
# COPY ./src/* /src/
CMD ["nodemon", "bin/www"]