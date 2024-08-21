FROM ghcr.io/puppeteer/puppeteer:23.1.1

USER root

WORKDIR /app

COPY package*.json ./

RUN npm install

#RUN npx puppeteer browsers install chrome

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
