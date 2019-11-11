'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.hasMany(models.User, {
      as: 'User',
    });
    Company.hasMany(models.Profile, {
      foreignKey: 'user_id',
      sourceKey: 'name'
    });
  };
  return Company;
};