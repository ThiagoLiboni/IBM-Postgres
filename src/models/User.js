import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
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
        type: Sequelize.STRING(13),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(75),
        allowNull: false
      },
      brokerName: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      brokerCity: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      brokerState: {
        type: Sequelize.STRING(2),
        allowNull: true
      },
      brokerPhone: {
        type: Sequelize.STRING(13),
        allowNull: true
      }
    }, {
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