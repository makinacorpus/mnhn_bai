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
        var filter_criteria = {};
        var isAdmin = false;
        var filters = {'published' : true};

        // pagination
        var items_per_page = req.param('items_per_page');
        if(!items_per_page) {
            if(req.session.filters && req.session.filters['items_per_page'])
                items_per_page = req.session.filters['items_per_page'];
            else
                items_per_page = 20;
        }
        filter_criteria['items_per_page'] =  items_per_page;
        
        var page_num = req.param('page_num');
        if(page_num)
            filter_criteria['page_num'] =  page_num;
        else {
            if(req.session.filters && req.session.filters['page_num'])
                page_num = req.session.filters['page_num'];
                filter_criteria['page_num'] =  page_num;
        }
        
        if(req.user && req.user.isAdmin()) {
            isAdmin = true;
            delete filters['published'];
        }
        
        // category
        var cat = req.param('category');
        if(cat && cat != '') {
            filters['category'] =  cat;
            filter_criteria['category'] =  cat;
        } else {
            if(req.session.filters) {
                cat = req.session.filters['category']
                if(cat && cat != '') {
                    filters['category'] =  cat;
                    filter_criteria['category'] =  cat;
                }
            }
        }
        
        // free_search
        var freesearch = req.param('freesearch');
        if(freesearch && freesearch != '') {
            filter_criteria['freesearch'] =  freesearch;
            filters['or'] = [
                { title: {'contains': freesearch}, },
                { short_desc: {'contains': freesearch}, },
                { complete_desc: {'contains': freesearch}, }
            ];
        } else {
            if(req.session.filters) {
                freesearch = req.session.filters['freesearch'];
                if(freesearch && freesearch != '') {
                    filter_criteria['freesearch'] =  freesearch;
                    filters['or'] = [
                        { title: {'contains': freesearch}, },
                        { short_desc: {'contains': freesearch}, },
                        { complete_desc: {'contains': freesearch}, }
                    ];
                }
            }
        }

        // TODO: gallery (setting for default gallery ?)
            
        // Remove filter    
        remove_filter = req.param('remove_filter');
        if(remove_filter) {
            if(remove_filter == 'freesearch') 
                delete filters['or'];
            else
                delete filters[remove_filter];
            delete filter_criteria[remove_filter];
        }
            
        // save filters
        req.session.filters = filter_criteria;

        if(!page_num) {
            page_num = 1;
        }
        
        //var users = req.param('users').split(',');
        //User.find().where({id: users}).exec(function (err, response) {// do stuff});
    
        Object3D.find().where(filters).exec(function (err, post) {
                if(err) {
                    return res.error();
                }
                nb_obj = post.length;
                nb_pages = Math.floor(nb_obj / items_per_page)
                nb_pages_remains = nb_obj % items_per_page
                if (nb_pages_remains > 0)
                    nb_pages = nb_pages + 1;
                Object3D.find().paginate({page: page_num, limit: items_per_page}).sort('title asc').where(filters).exec(function (err, post) {
                        if(err) {
                            return res.error();
                        }
                        res.view('gallery', {listObj: post, listFilters: filter_criteria, isAdmin: isAdmin, nb_pages: nb_pages, items_per_page: items_per_page});
                    }
                );
            }
        );
    }
};

