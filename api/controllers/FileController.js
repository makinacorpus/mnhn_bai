/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `FileController.upload()`
     *
     * Upload file(s) to the server's disk.
    */
    //upload: function (req, res) {
    upload: function (req, res, obj, callback, input_name) {

        // e.g.
        // 0 => infinite
        // 240000 => 4 minutes (240,000 miliseconds)
        // etc.
        //
        // Node defaults to 2 minutes.
        res.setTimeout(0);
        req.file(input_name).upload(
            // You can apply a file upload limit (in bytes)
            {maxBytes: 500000000, log: function (msg){console.log(msg);}},
            function onUploadComplete(err, uploadedFiles) {
                if (err) {
                    return res.serverError(err);
                }
                else {
                    callback(uploadedFiles, obj);
                    return res.json({
                        files: uploadedFiles,
                        textParams: req.params.all()
                    });
                }
            });
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

