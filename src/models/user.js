'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        uid: DataTypes.UUID,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        first_name: DataTypes.STRING,
        middle_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        registered_at: DataTypes.DATE,
        status: DataTypes.INTEGER,
        details: DataTypes.JSON
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
    });
    return User;
};