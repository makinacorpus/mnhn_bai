/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var fs = require('fs')
  , path = require('path');

module.exports.bootstrap = function(cb) {

    //cb();
  
    // make a symlink for the upload directory in the public
    var postsSource = path.join(process.cwd(), '.tmp/uploads')
        , postsDest = path.join(process.cwd(), '.tmp/public/uploads');

    if (!fs.existsSync(postsDest)) {
        fs.symlink(postsSource, postsDest, function(err) {
            cb(err);
        });
    }   
    else {
        cb();
    }
    
};
