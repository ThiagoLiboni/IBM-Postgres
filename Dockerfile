FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]
