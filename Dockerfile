FROM node:16 as builder

#Define working dir inside the container
WORKDIR /app

#Copy app into container
COPY ./src/ /app/src/
COPY *.json /app/
COPY *.lock /app/

#Install dependencies in container
RUN yarn 
RUN yarn build

#FROM node:16 as app
#COPY --from=builder /app/dist /app
#COPY --from=builder /app/node_modules /app
#WORKDIR /app
CMD [ "node", "dist/main.js" ]
