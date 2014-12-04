/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = {

    /**
     * `FileController.upload()`
     *
     * Upload file(s) to the server's disk.
    */
    upload: function (req, res, obj, callback, input_name) {
        var files = [];
        var clean = false;
        if(req.files === undefined){
            console.log('No file for '+input_name+';  did you forget mapping in config/http.js to '+req.url);
            return files;
        }
        if(req.files[input_name] !== undefined){
            // later we will support multiple html5
            var tocheck = [req.files[input_name]];
            _(tocheck).each(function check(file) {
                try {
                    var fs_file = file.toJSON();
                    var bn = path.basename(fs_file['path']);
                    if(!fs_file['mime'])
                        fs_file['mime'] = 'application/octect-stream';
                    if(!fs_file['filename'])
                        fs_file['filename'] = bn;
                    if(!fs_file['name'])
                        fs_file['name'] = bn;
                    fs_file['tmp_path'] = fs_file['path'];
                    fs_file['path'] = path.join(
                        sails.config.data.__pathData, bn);
                    fs_file['fd'] = fs_file['path'];
                    fs_file['title'] = fs_file['name'];
                    fs_file['f_file'] = file.toJSON();
                    // check size
                    if(file.size > sails.config.data.maxsinglesize)
                        clean = true;
                    if(file.size > 0) {
                        files.push(fs_file);
                    }
                } catch(err) {clean=true;}
            });
        };
        /* move files to real dest */
        if (!clean) {
            _(files).each(function(file) {
                try {fs.renameSync(file['tmp_path'],
                                   file['path']);}
                catch(err) {clean=true;console.log(err);}
            });
        }
        if (clean) {
            _(files).each(function(file) {
                try {
                    var fpath = file['tmp_path'];
                    if (fs.existsSync(fpath))
                        fs.removeSync(fpath);
                }
                catch(err) {console.log(err);}
            });
            return res.serverError('Upload error');
        }
        try {
                var err = callback(files, obj);
                if (err)
                    return err;
                return {files: files,
                        textParams: req.params.all()};
        }
        catch(err) {
                console.log(err);
                return res.serverError(err);
        }
    },


    /**
     * FileController.download()
     *
     * Download a file from the server's disk.
    */
    download: function (req, res) {
        require('fs').createReadStream(req.param('path'))
            .on('error', function (err) {
                return res.serverError(err);
            })
        .pipe(res);
  }
};

