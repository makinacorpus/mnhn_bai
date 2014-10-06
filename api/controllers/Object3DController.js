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
        res.view('admin/object3D_edit', {obj: undefined});
    },
    

    /**
    * `3DObjectController.edit()`
    */
    edit: function (req, res) {
        var id = req.param('id')
        Object3D.findOne({ id: id }, function(err, obj3D) {
                if(err)
                    return res.error();
                
                res.view('admin/object3D_edit', {obj: obj3D});
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
                obj3D.title = req.param('title');
                obj3D.short_desc = req.param('short_desc');
                obj3D.complete_desc = req.param('complete_desc');
                obj3D.category = req.param('category');
                obj3D.filename_3D = req.param('filename_3D');
                obj3D.filename_flat = req.param('filename_flat');
                obj3D.preview = req.param('preview');
                obj3D.gallery = req.param('gallery');
                obj3D.published = req.param('published');
                obj3D.save();
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
                obj3D.delete();
                res.redirect('/gallery');
        });
    },


    /**
    * `3DObjectController.detail()`
    */
    detail: function (req, res) {
        var isAdmin = false;
        if(req.user && req.user.isAdmin())
            isAdmin = true;
        
        var filter = {id: req.param('id')}

        var id = req.param('id')
        Object3D.findOne({ id: id }, function(err, obj3D) {
                if(err)
                    return res.error();

                res.view('detail', {obj: obj3D, isAdmin: isAdmin});
            }
        );
    }
};

