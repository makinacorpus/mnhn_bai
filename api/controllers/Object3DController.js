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
            
            // Download files attached
            sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.saveMedias);
            
            //res.view('detail', {obj: obj3D, isAdmin: true});
            res.redirect('/detail/'+obj3D.getId());
        });
    },


    /**
    * `3DObjectController.add()`
    */
    add: function (req, res) {
        // List available .ply and .nii file on the server
        ply_files = Utils.get_available_files('.ply');
        nii_files = Utils.get_available_files('.gz');
        res.view('admin/object3D_edit', {obj: undefined, ply: ply_files, nii: nii_files});
    },
    

    /**
    * `3DObjectController.edit()`
    */
    edit: function (req, res) {
        var id = req.param('id');
        
        // List available .ply and .nii file on the server
        ply_files = Utils.get_available_files('.ply');
        nii_files = Utils.get_available_files('.gz');
        
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
                
                // Download files attached
                sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.saveMedias);
                
                obj3D.save();
                
                //Redirect to detail view
                //res.view('detail', {obj: obj3D, isAdmin: true});
                res.redirect('/detail/'+obj3D.getId());
        });
    },

    
    /**
    * `3DObjectController.saveMedias()`
    */
    saveMedias: function (files, obj3D) {
        // TODO: create Media object, and attached them to obj3D
        for(i = 0; i < files.length; i++) {
            params = {};
            params['title'] = files[i].filename; // title
            params['path'] = files[i].fd // path
            params['object3d'] = obj3D.getId();
            params['type'] = files[i].type;
            params['filename'] = files[i].fd.replace(/^.*[\\\/]/, '');

            Media.create(params).exec(function (err, media) {
                if (err)
                    return res.negotiate(err);        
            });
            
        }
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
                
                // Get medias
                
                Media.find().where({object3d: obj3D.getId()}).exec(function (err, medias) {
                    if(err) {
                        return res.error();
                    }
                    
                    medias_pictures = [];
                    medias.forEach(function(media, index) {
                        if(media.isImage()) {
                            medias_pictures.push(media);
                        }
                    });
                    console.log(medias_pictures);
                    // Launch detail view
                    res.view('detail', {obj: obj3D, medias: medias, medias_pictures: medias_pictures, isAdmin: isAdmin});
                });
            }
        );
    }

};

