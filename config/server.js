
import { Sequelize } from 'sequelize';
import config from './database.js';
import Client from '../src/models/Client.js';
import User from '../src/models/User.js';
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(config);
Client.init(sequelize);
User.init(sequelize);

Client.associate(sequelize.models);
User.associate(sequelize.models);

function startServer(app) {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection with database established');
            app.listen(process.env.PORT, () => {
                console.log('Server started',
                );
            });
        })
        .catch((err) => {
            console.error('Error to conect with database:', err);
        });
}

export default startServer;