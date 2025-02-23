FROM node:20

WORKDIR /app

RUN git config core.sparseCheckout true && \
    echo ".env" >> .git/info/sparse-checkout && \
    git clone --no-checkout https://github.com/ThiagoLiboni/IBM-System-Services.git IBM-System-Services && \
    cd IBM-System-Services && \
    git checkout master && \
    cp ./.env /app/.env

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3030

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]