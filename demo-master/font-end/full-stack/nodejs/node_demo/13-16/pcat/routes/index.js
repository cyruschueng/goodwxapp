
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index',{title:"PCAT",name:"marico"});
};
exports.pcat=function(req,res){
	res.render('pcat',{title:'PCAT',name:"marico",_layoutFile: 'pcatlayout'})
}