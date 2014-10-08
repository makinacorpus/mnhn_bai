/**
 * Utilities functions
 *
 * @description :: Utilities
 * @help        :: 
 */

module.exports = {
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