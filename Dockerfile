FROM node:14-alpine

EXPOSE 3000
EXPOSE 3001

WORKDIR /home/app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build

CMD ./scripts/start.sh