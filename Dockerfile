FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y git

RUN git clone --filter=blob:none --no-checkout https://github.com/ThiagoLiboni/IBM-System-Services.git IBM-System-Services && \
    cd IBM-System-Services && \
    git sparse-checkout init --cone && \
    git sparse-checkout set .env && \
    git checkout master && \
    cp .env /app/.env

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]
