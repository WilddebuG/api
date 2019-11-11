'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.INTEGER(1)
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.hasOne(models.Company, {
      foreignKey: 'id',
      foreignKeyConstraint: 'companyId',
      as: 'userCompany'
    });
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Profile;
};