'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        companyId: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        status: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        token: DataTypes.STRING
    }, {});
    User.associate = function (models) {
        User.belongsTo(models.Company, {
            foreignKey: 'companyId',
        });
        User.hasOne(models.Profile, {
            foreignKey: 'user_id',
        });
    };
    return User;
};