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
  , path = require('path')
  , _ = require('lodash');

function exists(fic) {
   try{
       fs.lstatSync(fic);
       return true;
   } catch(err) {return false;}
}

module.exports.bootstrap = function(cb) {
    //cb();
    // make a symlink for the upload directory in the public
    var postsDest = path.join(process.cwd(), '.tmp/public/uploads')
        , postsSource = sails.config.data.__pathData
        , postsTmp = sails.config.data.__uploadData;

    console.log('TMP files: ' + postsTmp);
    console.log('Upload folder: ' + postsSource);
    console.log('Published path: ' + postsDest);
    _([postsTmp, postsSource]).each(function(d){
        if (!exists(d)) {
            console.log('Creating ' + d);
            fs.mkdirSync(d);
        }
    });
    if (exists(postsDest)) {
        console.log('here');
        console.log(fs.readlinkSync(postsDest));
        if(fs.readlinkSync(postsDest) != postsSource) {
            console.log('Stale symlink' + postsDest);
            fs.unlinkSync(postsDest);
        }
    }
    if (!exists(postsDest)) {
        console.log(postsDest + ' -> '+ postsSource);
        fs.symlink(postsSource, postsDest, function(err) {
            if(err) {console.log(err);}
            cb(err);
        });
    }
    else {
        cb();
    }

};
