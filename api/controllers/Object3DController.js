/**
 * 3DObjectController
 *
 * @description :: Server-side logic for managing 3DObjects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
    * `3DObjectController.create()`
    */
    create: function (req, res) {
        Object3D.create(req.params.all()).exec(function (err, obj3D) {
            if (err)
                return res.negotiate(err);        
            res.view('detail', {obj: obj3D, isAdmin: true});
        });
    },


    /**
    * `3DObjectController.add()`
    */
    add: function (req, res) {
        // List available .ply and .nii file on the server
        ply_files = Utils.get_available_files('.ply');
        nii_files = Utils.get_available_files('.nii');
        res.view('admin/object3D_edit', {obj: undefined, ply: ply_files, nii: nii_files});
    },
    

    /**
    * `3DObjectController.edit()`
    */
    edit: function (req, res) {
        var id = req.param('id');
        
        // List available .ply and .nii file on the server
        ply_files = Utils.get_available_files('.ply');
        nii_files = Utils.get_available_files('.nii');
        
        // Edit object
        Object3D.findOne({ id: id }, function(err, obj3D) {
                if(err)
                    return res.error();
                
                res.view('admin/object3D_edit', {obj: obj3D, ply: ply_files, nii: nii_files});
            }
        );
    },


    /**
    * `3DObjectController.save()`
    */
    save: function (req, res) {
        var id = req.param('id')
        Object3D.findOne({ id: id }, function(err, obj3D) {
                if(err)
                    return res.error();
                
                // Maj object's attributes
                obj3D.title = req.param('title');
                obj3D.short_desc = req.param('short_desc');
                obj3D.complete_desc = req.param('complete_desc');
                obj3D.category = req.param('category');
                obj3D.filename_3D = req.param('filename_3D');
                obj3D.filename_flat = req.param('filename_flat');
                obj3D.preview = req.param('preview');
                obj3D.gallery = req.param('gallery');
                
                published = req.param('published');
                obj3D.published = false;
                if(published == 'published') {
                    obj3D.published = true;
                }
                obj3D.save();
                
                //Redirect to detail view
                res.view('detail', {obj: obj3D, isAdmin: true});
        });
    },


    /**
    * `3DObjectController.delete()`
    */
    delete: function (req, res) {
        var id = req.param('id')
        Object3D.findOne({ id: id }, function(err, obj3D) {
                if(err)
                    return res.error();
                obj3D.destroy();
                //Redirect to gallery
                res.redirect('/gallery');
        });
    },


    /**
    * `3DObjectController.detail()`
    */
    detail: function (req, res) {
        
        // Check if user is admin
        var isAdmin = false;
        if(req.user && req.user.isAdmin())
            isAdmin = true;
        
        // Get object infos
        var id = req.param('id')
        Object3D.findOne({ id: id }, function(err, obj3D) {
                if(err) {
                    //return res.error();
                    return err;
                }

                // Read .nii
                // TODO
                /*
                var nifti = require('nifti-js');
                var fs = require('fs');
                var path = require('path');
                var ndarray = require('ndarray');
                var file = nifti.parse(fs.readFileSync(sails.config.data.__pathData+obj3D.getFileNameFlat()));
                file.buffer = file.buffer.byteLength + " bytes";
                file.data = file.data.length + " items";
                console.log(file);
                
                var nii_data = ndarray(file.data, file.sizes.slice().reverse());
                console.log(nii_data);
                */
                // Launch detail view
                res.view('detail', {obj: obj3D, isAdmin: isAdmin});
            }
        );
    }

};

