/**
 * Utilities functions
 *
 * @description :: Utilities
 * @help        ::
 */


var fs = require('fs');
var _path = require('path');

function exists(fic) {
       try{
           fs.lstatSync(fic);
           return true;
       } catch(err) {return false;}
}

function remove_path(path) {
    if (path) {
        if (exists(path)) {
            try {
                fs.unlinkSync(path);
            }
            catch(err){console.log(err);}
        }
    }
}

function upload_path(path){
    if(path)
        return _path.join(sails.config.data.__pathData, path);
    else return null;
}

module.exports = {
    file_exists: exists,
    remove_path: remove_path,
    upload_path: upload_path,
    get_available_files: function(ext) {
        var required_files = [];
        var fs = require('fs');
        files = fs.readdirSync(sails.config.data.__pathData);
        files.forEach( function (file) {
            if(file.substr(-ext.length) === ext) {
                required_files.push(file);
            }
        });
        return required_files;
//         , function (err, files) { // '/' denotes the root folder
//             if(files) {
//                 files.forEach( function (file) {
//                     fs.lstat('/'+file, function(err, stats) {
//                         if (!err && stats.isDirectory()) { //conditing for identifying folders
//                             //$('ul#foldertree').append('<li class="folder">'+file+'</li>');
//                             console.log(file);
//                         }
//                         else{
//                             console.log(file);
//                             //$('ul#foldertree').append('<li class="file">'+file+'</li>');
//                         }
//                     });
//                 });
//             }
//         });
    }
};
