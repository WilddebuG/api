'use strict';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        salt: DataTypes.STRING,
        hash: DataTypes.STRING,
        exp: DataTypes.INTEGER,
        companyId: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true,
            }
        },
        status: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true,
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
    User.methods.setPassword = function (password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };
    User.methods.validatePassword = function(password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    };

    User.methods.generateJWT = function() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
    };

    User.methods.toAuthJSON = function() {
        return {
            _id: this._id,
            email: this.email,
            token: this.generateJWT(),
        };
    };
    return User;
};