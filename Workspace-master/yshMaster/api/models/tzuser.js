module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tcuser', {
  	tid : {
		type         : DataTypes.INTEGER,
		primaryKey   : true
	},
  	name : {
		type      : DataTypes.STRING,
		allowNull : false
	},
	num : {
		type         : DataTypes.STRING,
		allowNull    : false
	},
	isok : {
		type         : DataTypes.INTEGER,
		allowNull    : true
	},
	rztime:{
		type:DataTypes.DATE,
		allowNull:true
	}
  },
  {
  	timestamps: false,
  	tableName: 'ysh_tc_user' 
  });
}