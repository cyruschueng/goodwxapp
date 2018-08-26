
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.pcat = function(req, res){
  res.render('pcat', { title: 'PCAT' });
};
exports.pcat2 = function(req, res){
  res.render('pcat2', { title: 'PCAT2' ,layout:'layout.jade'});
};