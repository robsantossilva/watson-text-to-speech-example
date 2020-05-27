#!/bin/bash

npm config set cache /home/node/app/.npm-cache --global

cd /home/node/app

if [ ! -d "audio" ]; then
  mkdir audio
fi

#npm install knex -g

npm install

#knex migrate:latest --env development

npm run start
