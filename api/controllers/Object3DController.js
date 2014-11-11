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
        Object3D.findOne({ id: id }).populate('medias').exec(function(err, obj3D) {
            if(err)
                return res.error();
            
            // Launch edit view
            res.view('admin/object3D_edit', {obj: obj3D, ply: ply_files, nii: nii_files, medias: obj3D.medias});
        });
    },


    /**
    * `3DObjectController.save()`
    */
    save: function (req, res) {
        var id = req.param('id')
        //Object3D.findOne({ id: id }, function(err, obj3D) {
        Object3D.findOne({ id: id }).populate('medias').exec(function(err, obj3D) {
                if(err)
                    return res.error();
                
                // Maj object's attributes
                obj3D.title = req.param('title');
                obj3D.short_desc = req.param('short_desc');
                obj3D.complete_desc = req.param('complete_desc');
                obj3D.category = req.param('category');
                //obj3D.filename_3D = req.param('filename_3D');
                obj3D.filename_flat = req.param('filename_flat');
                //obj3D.preview = req.param('preview');
                obj3D.gallery = req.param('gallery');
                
                published = req.param('published');
                obj3D.published = false;
                if(published == 'published') {
                    obj3D.published = true;
                }

                // Download 3D file
                sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.save3Dmodel, 'filename_3D');
               
                // Download flat file
                sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.saveFlatmodel, 'filename_flat');
                
                // Download preview file
                sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.savePreview, 'preview');

                // Download preview animated file
                sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.savePreviewAnimated, 'preview_animated');

                // Download files attached
                sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.saveMedias, 'media_files');
                
                // manage media deletion
                if(req.param('delete_medias')) {
                    del_medias = req.param('delete_medias').split(",");
                    for(i = 0; i < del_medias.length; i++) {
                        obj3D.medias.forEach(function(media, index) {
                            if(media.getId() == del_medias[i]) {
                                media.destroy();
                            }
                        });
                    }
                }                
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
        // create Media object, and attached them to obj3D
        for(i = 0; i < files.length; i++) {
            params = {};
            params['title'] = files[i].filename; // title
            params['path'] = files[i].fd // path
            //params['object3d'] = obj3D.getId();
            params['type'] = files[i].type;
            params['filename'] = files[i].fd.replace(/^.*[\\\/]/, '');

            Media.create(params).exec(function (err, media) {
                if (err)
                    return res.negotiate(err);
                obj3D.medias.add(media.id);
                obj3D.save(function(err){
                    if(err){
                        console.log(err);
                    }
                });                
            });
            
        }
    },


    /**
    * `3DObjectController.save3Dmodel()`
    */
    save3Dmodel: function (files, obj3D) {
        // Files will always contain one only file
        if(files.length > 0) {
            obj3D.filename_3D = files[0].fd.replace(/^.*[\\\/]/, '');
            obj3D.save();
        }
    },


    /**
    * `3DObjectController.saveFlatmodel()`
    */
    saveFlatmodel: function (files, obj3D) {
        // Files will always contain one only file
        if(files.length > 0) {
            obj3D.filename_flat = files[0].fd.replace(/^.*[\\\/]/, '');
            obj3D.save();
        }
    },


    /**
    * `3DObjectController.savePreview()`
    */
    savePreview: function (files, obj3D) {
        // Files will always contain one only file
        if(files.length > 0) {
            obj3D.preview = files[0].fd.replace(/^.*[\\\/]/, '');
            obj3D.save();
        }
    },

    
    /**
    * `3DObjectController.savePreviewAnimated()`
    */
    savePreviewAnimated: function (files, obj3D) {
        // Files will always contain one only file
        if(files.length > 0) {
            obj3D.preview_animated = files[0].fd.replace(/^.*[\\\/]/, '');
            obj3D.save();
        }
    },

    
    /**
    * `3DObjectController.delete()`
    */
    delete: function (req, res) {
        var id = req.param('id')
        //Object3D.findOne({ id: id }, function(err, obj3D) {
        Object3D.findOne({ id: id }).populate('medias').populate('annotations').exec(function(err, obj3D) {
            if(err)
                return res.error();
            obj3D.destroy();
            
            // Destroy media associated
            obj3D.medias.forEach(function(media, index) {
                media.destroy();
            });
                
            // Destroy annotations associated
            obj3D.annotations.forEach(function(annotation, index) {
                annotation.destroy();
            });
            
            //Redirect to gallery
            res.redirect('/gallery');
        });
    },

    /**
    * `3DObjectController.getDetail()`
    */
    getDetail: function (req, res, template_view) {
        
        // Check if user is admin
        var isAdmin = false;
        //if(req.user && req.user.isAdmin())
        if(req.user && req.session.isadmin)
            isAdmin = true;
        
        // Get object infos
        var id = req.param('id')
        Object3D.findOne({ id: id }).populate('medias').populate('annotations').exec(function(err, obj3D) {
                if(err) {
                    //return res.error();
                    return err;
                }
                
                medias_pictures = [];
                obj3D.medias.forEach(function(media, index) {
                    if(media.isImage()) {
                        medias_pictures.push(media);
                    }
                });
                
                // Launch detail view
                res.view(template_view, {obj: obj3D, medias: obj3D.medias, medias_pictures: medias_pictures, annotations: obj3D.annotations, isAdmin: isAdmin});
            }
        );
    },
    

    /**
    * `3DObjectController.detail()`
    */
    detail: function (req, res) {        
        sails.controllers.object3d.getDetail(req, res, 'detail');
    },
    
    /**
    * `3DObjectController.embed()`
    */
    embed: function (req, res) {
        sails.controllers.object3d.getDetail(req, res, 'embed');
    }

};

