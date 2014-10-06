/**
 * GalleryController
 *
 * @description :: Server-side logic for managing gallery
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
    * `GalleryController.filter_objects()`
    */
    filter_objects: function (req, res) {
        
        // see http://stackoverflow.com/questions/20378997/waterline-orm-sails-js-conditions-with-not-equal-in-query
        //var nbObjects = Object3D.count();
        // TODO pagination
        
        var filter_criteria = {};
        var isAdmin = false;
        var filters = {'published' : true};
        
        if(req.user && req.user.isAdmin()) {
            isAdmin = true;
            delete filters['published'];
        }
        
        var cat = req.param('category');
        var freesearch = req.param('freesearch');
        if(cat && cat != '') {
            filters['category'] =  cat;
            filter_criteria['category'] =  cat;
        }
        
        // free_search
        if(freesearch && freesearch != '') {
            filter_criteria['freesearch'] =  freesearch;
            filters['or'] = [
                { title: {'contains': freesearch}, },
                { short_desc: {'contains': freesearch}, },
                { complete_desc: {'contains': freesearch}, }
            ];
        }

        // TODO: gallery (setting for default gallery ?)
            
        // TODO save filters
        req.session.filters = filter_criteria;
        
        //var users = req.param('users').split(',');
        //User.find().where({id: users}).exec(function (err, response) {// do stuff});
    
        //Object3D.find().where({category: cat, gallery: 1}).exec(function (err, post) {
        //console.log(filters);
        
        //Object3D.find().where(filter_published).where(filters).exec(function (err, post) {
        Object3D.find().where(filters).exec(function (err, post) {
                if(err) {
                    return res.error();
                }
                res.view('gallery', {listObj: post, listFilters: filter_criteria, isAdmin: isAdmin});
            }
        );
    }
};

