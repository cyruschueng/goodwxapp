module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tcbonus', {
  	bonus_id : {
		type         : DataTypes.INTEGER,
		primaryKey   : true
	},
  	bonus_type_id : {
		type         : DataTypes.INTEGER,
		allowNull   : false
	},
  	bonus_sn : {
		type      : DataTypes.INTEGER,
		allowNull : false
	},
	user_id : {
		type         : DataTypes.INTEGER,
		allowNull    : false
	},
	used_time : {
		type         : DataTypes.INTEGER,
		allowNull    : false
	},
	order_id:{
		type:DataTypes.INTEGER,
		allowNull:false
	},
	emailed : {
		type         : DataTypes.INTEGER,
		allowNull    : false
	},
		goodsid : {
		type         : DataTypes.INTEGER,
		allowNull    : true
	},
		creatAt : {
		type         : DataTypes.DATE,
		allowNull    : true
	}
  },
  {
  	timestamps: false,
  	tableName: 'ysh_user_bonus' 
  });
}