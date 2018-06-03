'use strict';
module.exports = (sequelize, DataTypes) => {
  var order_master = sequelize.define('order_master', {
    obj_id: DataTypes.STRING,
    vendor_id: DataTypes.TEXT
  }, {});
  order_master.associate = function(models) {
    // associations can be defined here
  };
  return order_master;
};