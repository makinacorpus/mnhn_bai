/**
 * Module dependencies
  // Configure body parser components
 */
var _ = require('lodash');
var util = require('util');
var formidable = require('formidable');

function mime(req) {
  var str = req.headers['content-type'] || '';
  return str.split(';')[0];
}

function parseMultipart(req, res, next) {
  req.form = new formidable.IncomingForm();
  req.form.uploadDir = sails.config.data.__uploadData;
  req.form.maxFieldsSize = sails.config.maxsize;
  req.form.multiple = true;
  // res.setTimeout(0);
  req.form.parse(req, function(err, fields, files) {
    if (err)
        return next(err);
    else {
      req.files = files;
      req.fields = fields;
      req.body = extend(fields, files);
      next();
    }
  });
}

function extend(target) {
  var key, obj;
  for (var i = 1, l = arguments.length; i < l; i++) {
    if ((obj = arguments[i])) {
      for (key in obj)
        target[key] = obj[key];
    }
  }
  return target;
}

function disable_parser(opts, req, res)  {
    var matched = false;
    try {
        var method = null;
        try {method = req.method.toLowerCase();}
        catch(err){ /* */}
        if(method) {
            _(opts.urls).forEach(function(turl) {
                if (method === 'post' && req.url.match(turl)) {
                    // console.log("matched"+ req.url);
                    if(!matched) matched = true;
                };});
        }
    } catch(err) { debug(err);/* pass */ }
    return matched;
}

module.exports = function toParseHTTPBody(options) {
  options = options || {};
  var bodyparser = require('skipper')(options);
  // NAME of anynonymous func IS IMPORTANT (same as the middleware in config) !!!
  return function cbodyParser(req, res, next) {
    var err_hdler = function(err) {};
    if (disable_parser(options, req, res) && mime(req) == 'multipart/form-data') {
        return parseMultipart(req, res, next);
    } else {
        return bodyparser(req, res, next);
    }
  };
};
