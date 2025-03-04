import Sequelize, { Model } from "sequelize";

  class Client extends Model {
    static init(sequelize){
      super.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      email: {
        unique: true,
        type: Sequelize.STRING(50),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING(13),
        allowNull: false
      },
      sellerId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      },{
        sequelize,
        modelName: 'Client',
        tableName: 'Clients',
        timestamps: true,
      })
    }
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'sellerId', as: 'users' });
    }
  }
export default Client;