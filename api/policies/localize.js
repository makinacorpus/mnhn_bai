module.exports = function(req, res, next) {
  //req.setLocale(req.session.languagePreference);
//   req.setLocale(req.param('lang')); 
  req.locale = req.param('lang');
  next();
}; 


