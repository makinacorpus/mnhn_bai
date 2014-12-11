/**
 * 3DObjectController
 *
 * @description :: Server-side logic for managing 3DObjects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');
var multiparty = require('multiparty');
var http = require('http');
var util = require('util');



function destroy_obj(obj3D) {
    return obj3D.remove();
}


function save_obj(req, res, obj3D, err, create) {
    if(err)
        if (err) {
            if(obj3D !== undefined && create) {
                try {
                    destroy_obj(obj3D);
                } catch(err) {console.log(err);}
            }
            return res.json({"err": err, "status": false});}
    if (create) {
        obj3D.save();
    }
    // Maj object's attributes
    obj3D.title = req.param('title');
    obj3D.short_desc = req.param('short_desc');
    obj3D.complete_desc = req.param('complete_desc');
    obj3D.category = req.param('category');
    //obj3D.filename_3D = req.param('filename_3D');
    //obj3D.filename_flat = req.param('filename_flat');
    //obj3D.preview = req.param('preview');
    obj3D.gallery = req.param('gallery');
    if(req.param('dim_x'))
        obj3D.dim_x = req.param('dim_x');
    if(req.param('dim_y'))
        obj3D.dim_y = req.param('dim_y');
    if(req.param('dim_z'))
        obj3D.dim_z = req.param('dim_z');
    obj3D.copyright = req.param('copyright');

    associated_tab = req.param('associated_objects');
    if(associated_tab) {
        associated_tab.forEach(function(associated, index) {
            obj3D.associated.add(associated);
        });
    }
    published = req.param('published');
    obj3D.published = false;
    if(published == 'published') {
        obj3D.published = true;
    }

    // Download files attached
    sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.saveMedias, 'media_files');

    // Download 3D file
    sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.save3Dmodel, 'filename_3D');

    // Download flat file
    sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.saveFlatmodel, 'filename_flat');

    // Download preview file
    sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.savePreview, 'preview');

    // Download preview animated file
    sails.controllers.file.upload(req, res, obj3D, sails.controllers.object3d.savePreviewAnimated, 'preview_animated');

    // manage media deletion
    if(req.param('delete_medias')) {
        del_medias = req.param('delete_medias').split(",");
        for(i = 0; i < del_medias.length; i++) {
            obj3D.medias.forEach(function(media, index) {
                if(media.getId() == del_medias[i]) {
                    media.remove();
                }
            });
        }
    }
    var ret = true;
    var rerr = null;
    obj3D.save(function(err){
        if(obj3D !== undefined && create && err) {
            try {
                destroy_obj(obj3D);
            } catch(derr) {console.log(derr);}
        }
        if(err){console.log(err);rerr=err;ret=false;}
    });

    //Redirect to detail view
    //res.view('detail', {obj: obj3D, isAdmin: true});
    //res.redirect('/detail/'+obj3D.getId());
    return res.json({url: '/detail/'+obj3D.getId(),
                    err: rerr, status: ret});
}

module.exports = {

    /**
    * `3DObjectController.add()`
    */
    add: function (req, res) {
        // List available .ply and .nii file on the server
        //ply_files = Utils.get_available_files('.ply');
        //nii_files = Utils.get_available_files('.gz');
        //res.view('admin/object3D_edit', {obj: undefined, ply: ply_files, nii: nii_files});
        res.view('admin/object3D_edit', {obj: undefined});
    },


    /**
    * `3DObjectController.create()`
    */
    create: function (req, res) {
        var params = {};
        var filtered = ['media_files', 'filename_flat', 'filename_3d', 'preview', 'preview_animated'];
        for(param in req.body) {
            if (!_.contains(filtered, param)) {
                params[param] = req.body[param];
            }
        }
        Object3D.create(params).exec(function (err, obj3D) {
            return save_obj(req, res, obj3D, err, true);
        });
    },

    /**
    * `3DObjectController.edit()`
    */
    edit: function (req, res) {
        var id = req.param('id');

        // List available .ply and .nii file on the server
        //ply_files = Utils.get_available_files('.ply');
        //nii_files = Utils.get_available_files('.gz');

        // Edit object
        Object3D.findOne({ id: id }).populate('medias').exec(function(err, obj3D) {
            if(err)
                return res.error();

            // Launch edit view
            //res.view('admin/object3D_edit', {obj: obj3D, ply: ply_files, nii: nii_files, medias: obj3D.medias});
            res.view('admin/object3D_edit', {obj: obj3D, medias: obj3D.medias});
        });
    },


    /**
    * `3DObjectController.save()`
    */
    save: function (req, res) {
        // parse a file upload
        var id = req.param('id')
        Object3D.findOne({ id: id }).populate('medias').exec(function(err, obj3D) {
            return save_obj(req, res, obj3D, err);
        });
    },


    /**
    * `3DObjectController.saveMedias()`
    */
    saveMedias: function (files, obj3D) {
        // create Media object, and attached them to obj3D
        for(i = 0; i < files.length; i++) {
            params = {};
            params['title'] = files[i].title; // title
            params['path'] = files[i].fd // path
            //params['object3d'] = obj3D.getId();
            params['type'] = files[i].type;
            params['filename'] = files[i].filename;
            Media.create(params).exec(function (err, media) {
                if (err)
                    return res.negotiate(err);
                obj3D.medias.add(media.id);
                obj3D.save(function(err){
                    if(err){console.log(err);return err;}
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
            obj3D.filename_3D = files[0].filename;
            obj3D.save(function(err){
                if(err){console.log(err);return err;}
            });
        }
    },


    /**
    * `3DObjectController.saveFlatmodel()`
    */
    saveFlatmodel: function (files, obj3D) {
        // Files will always contain one only file
        if(files.length > 0) {
            obj3D.filename_flat = files[0].filename;
            obj3D.save(function(err){
                if(err){console.log(err);return err;}});
        }
    },


    /**
    * `3DObjectController.savePreview()`
    */
    savePreview: function (files, obj3D) {
        // Files will always contain one only file
        if(files.length > 0) {
            obj3D.preview = files[0].filename;
            obj3D.save(function(err){
                if(err){console.log(err);return err;}});
        }
    },


    /**
    * `3DObjectController.savePreviewAnimated()`
    */
    savePreviewAnimated: function (files, obj3D) {
        // Files will always contain one only file
        if(files.length > 0) {
            obj3D.preview_animated = files[0].filename;
            obj3D.save(function(err){
                if(err){console.log(err);return err;}});
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
            destroy_obj(obj3D);
            //Redirect to gallery
            res.redirect('/gallery/'+req.session.gallery);
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
        Object3D.findOne({id: id})
            .populate('medias').populate('annotations').populate('associated')
            .exec(function(err, obj3D) {
                if(err) { return err;}
                medias_pictures = [];
                if(obj3D.medias !== undefined) {
                    obj3D.medias.forEach(function(media, index) {
                        if(media.isImage()) {
                            medias_pictures.push(media);
                        }
                    });
                }
                // Launch detail view
                res.view(template_view, {obj: obj3D, medias: obj3D.medias, medias_pictures: medias_pictures,
                         annotations: obj3D.annotations, associated: obj3D.associated,
                         comments: obj3D.comments, isAdmin: isAdmin});
            });
    },

    /**
    * `3DObjectController.get_comments()`
    */
    get_comments: function (req, res) {

        // Get comments
        var id = req.param('id');
        var tab_comments = [];

        Comment.find({ object3d: id }).populate('author').exec(function(err, comments) {
            comments.forEach(function(comment, index) {
                tab_comments.push({'comment': comment.comment,'updated': comment.updatedAt, 'author': comment.author.getUserName()})
            });
            return res.json(tab_comments);
        });
    },


    /**
    * `3DObjectController.get_objects()`
    */
    get_objects: function (req, res) {

        // Get comments
        var id = req.param('id');

        var tab_objects = [];
        if(id)
            var filters = {'published' : true, id: { '!': id }};
        else
            var filters = {'published' : true};

        Object3D.find(filters).exec(function(err, objects) {
            if(objects) {
                objects.forEach(function(object, index) {
                    tab_objects.push({'id': object.getId(), 'name': object.getTitle() })
                });
            }
            return res.json(tab_objects);
        });
    },


    /**
    * `3DObjectController.get_galleries()`
    */
    get_galleries: function (req, res) {

        // Get comments
        var tab_galleries = [];
        Gallery.find({}).exec(function(err, galleries) {
            if(galleries) {
                galleries.forEach(function(gallery, index) {
                    tab_galleries.push({'id': gallery.getId(), 'title': gallery.getTitle() })
                });
            }
            return res.json(tab_galleries);
        });
    },


    /**
    * `3DObjectController.get_categories()`
    */
    get_categories: function (req, res) {
        // Get object's categories
        var tab_categories = [];

        Object3D.find({}).exec(function(err, objects) {
            objects.forEach(function(object, index) {
                var found = tab_categories.indexOf(object.category);
                if(object.category && found == -1) {
                    tab_categories.push(object.category)
                }
            });
            return res.json(tab_categories);
        });
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
    },


    /**
    * `3DObjectController.add_comment()`
    */
    add_comment: function (req, res) {
        var id = req.param('id');
        var comment = req.param('comment');

        if(req.isAuthenticated) {
            Object3D.findOne({ id: id }).exec(function(err, obj3D) {
                Comment.create({'comment': comment, 'author': req.user, 'object3d': id}).exec(function (err, comment) {
                    if (err)
                        return res.negotiate(err);

                    obj3D.comments.add(comment.id);
                    obj3D.save(function(err){
                        if(err){
                            console.log(err);
                        }
                    });

                    return  res.json({status: true});
                });
            });
        } else {
            return  res.json({status: false});
        }

    },


    /**
    * `3DObjectController.edit_annotations()`
    */
    edit_annotations: function (req, res) {
        var id = req.param('id');

        // Edit object
        Object3D.findOne({ id: id }).populate('annotations').exec(function(err, obj3D) {
            if(err)
                return res.error();

            annotations = obj3D.annotations;

            // Launch edit view
            res.view('admin/annotation_edit', {obj: obj3D, annotations: annotations});
        });

    },

    /**
    * `3DObjectController.save_annotations()`
    */
    save_annotations: function (req, res) {
        var id = req.param('id');
        Object3D.findOne({ id: id }).populate('annotations').exec(function(err, obj3D) {
                if(err)
                    return res.error();

                count_new_annotations = req.param('count_new_annotation');
                del_annotations = req.param('delete_annotations');

                // save existing annotations
                obj3D.annotations.forEach(function(annotation, index) {
                    // for each annotation check if changes occurs
                    title = req.param('title_' + annotation.getId());
                    description = req.param('description_' + annotation.getId());
                    x = req.param('x_' + annotation.getId());
                    y = req.param('y_' + annotation.getId());
                    z = req.param('z_' + annotation.getId());

                    annotation.title = title;
                    annotation.description = description;
                    annotation.x = x;
                    annotation.y = y;
                    annotation.z = z;

                    annotation.save();
                });


                // Delete annotations
                if(del_annotations) {
                    del_annotations = del_annotations.split(",");
                    for(i = 0; i < del_annotations.length; i++) {
                        obj3D.annotations.forEach(function(annotation, index) {
                            if(annotation.getId() == del_annotations[i]) {
                                annotation.destroy();
                            }
                        });
                    }
                }

                // Add new annotations
                for(i = 1; i <= count_new_annotations; i++) {

                    title = req.param('title_new_' + i);
                    description = req.param('description_new_' + i);
                    x = req.param('x_new_' + i);
                    y = req.param('y_new_' + i);
                    z = req.param('z_new_' + i);

                    params = {};
                    params['title'] = title;
                    params['description'] = description;
                    params['x'] = x;
                    params['y'] = y;
                    params['z'] = z;
                    Annotation.create(params).exec(function (err, annotation) {
                        if (err)
                            return res.negotiate(err);
                        obj3D.annotations.add(annotation.id);
                        obj3D.save(function(err){
                            if(err){
                                console.log(err);return err;
                            }
                        });
                    });
                }

                //Redirect to detail view
                res.redirect('/detail/'+obj3D.getId());
        });


    }


};

