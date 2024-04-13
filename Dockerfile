FROM node:lts-alpine3.16

RUN mkdir -p /home/app

RUN rm -rf /home/app/.env

COPY . /home/app

CMD ["node", "/home/app/app.js"]