import Sequelize, { Model } from "sequelize";

  class User extends Model {
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
      phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      brokerName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      brokerCity: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      brokerState: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      brokerPhone: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
      },{
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true,
      })
    }
    static associate(models) {
      this.hasMany(models.Client, { foreignKey: 'sellerId', as: 'clients' });
   }
  }
export default User;