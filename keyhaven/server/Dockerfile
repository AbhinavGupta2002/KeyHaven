FROM node:12

ENV CONNECTION_STRING=postgres://cgcflvxb:U5xV8H1O5LcSQaTcj1xvA63c65o8Qwx8@ziggy.db.elephantsql.com/cgcflvxb

ENV PORT=5432

ENV JWT_ACCESS_KEY=ZyA7F9wPkfrps2KgxH2M5BM3jHLU42zP

ENV JWT_REFRESH_KEY=ZyA9K61dFO9sCYiNM62XmHc6Hdzvym21

ENV CLIENT_URL=http://localhost:3000

ENV SERVER_URL=http://localhost:5432

ENV EMAIL_KEY=nyuohojhlkgnjrwx

WORKDIR /express-app-container
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5432
CMD ["node", "node_modules/nodemon/bin/nodemon.js", "index"]
