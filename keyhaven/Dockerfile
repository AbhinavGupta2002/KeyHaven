FROM node:12

ENV PORT=3000

ENV REACT_APP_SERVER_URL=http://localhost:5432

WORKDIR /react-app-container
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
