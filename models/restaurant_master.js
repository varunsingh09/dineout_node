'use strict';
module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define('Restaurant', {
    r_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    profile_name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    locality_name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },area_name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },city_name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },state_name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },address: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },payment_mode: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },is_pf: {
        type: DataTypes.INTEGER,
    },is_ff: {
        type: DataTypes.INTEGER,
    }
    ,
  }, {
    freezeTableName: true,
    underscored: true, 
    tableName: 'restaurant_master',
    timestamps: false,
    
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Restaurant;
};