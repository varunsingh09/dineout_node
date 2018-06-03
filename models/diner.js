'use strict';
module.exports = function(sequelize, DataTypes) {
  var Diner = sequelize.define('Diner', {
    d_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    d_first_name: {
      type: DataTypes.STRING,
      allowNull: false,
       validate: {
        len: [2,10]
       }
    },
    d_last_name: {
      type: DataTypes.STRING,
      allowNull: false,
       validate: {
        len: [2,10]
       }
    },
    d_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
       validate: {
        isEmail: true
       }
    },d_phone: {
      type: DataTypes.STRING,
      allowNull: false,
       
    },
    d_dt: {
      type: DataTypes.STRING,
      defaultValue: sequelize.fn('NOW')
    },
    
  }, {
    freezeTableName: true,
    underscored: true, 
    tableName: 'diner',
    timestamps: false,
    
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Diner;
};