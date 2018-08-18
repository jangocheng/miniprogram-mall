# https://github.com/tencentyun/wafer2-quickstart
# https://github.com/nodejs/LTS
FROM node:8-slim

ENV APP_DIR /var/lib/app
WORKDIR $APP_DIR

# Bundle app source
COPY server .

RUN set -ex; \
    \
    # Install pm2
    npm install -g pm2; \
    \
    # Install app dependencies
    npm install;

EXPOSE 5757
CMD ["node", "app.js"]