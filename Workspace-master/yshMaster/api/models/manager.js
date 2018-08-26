module.exports = function(sequelize, DataTypes) {
  return sequelize.define('manager', {
  	user_id : {
		type         : DataTypes.INTEGER,
		primaryKey   : true
	},
  	user_name : {
		type      : DataTypes.STRING,
		allowNull : false
	},
	password : {
		type         : DataTypes.STRING,
		allowNull    : false
	},
	ec_salt : {
		type         : DataTypes.STRING,
		allowNull    : false
	}
  },
  {
  	timestamps: false,
  	tableName: 'ysh_admin_user' 
  });
}