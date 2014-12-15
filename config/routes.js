module.exports.routes = {

     '/*': function(req, res, next) {
         if(!req.session.lang)
            req.session.lang = "fr";
         res.setLocale(req.session.lang);
         return next();
     },
    
    '/:lang/': function(req, res, next) {
        req.session.lang = req.param('lang');
        if(req.session.lang == "en")
            return res.redirect('/en');
        else
            res.redirect('/');
     },

    '/': { view: 'home' },
    '/en': { view: 'home_en' },
     
    'get /login': { view: 'user/login' },
    'get /signup': { view: 'user/signup' },
    '/welcome': { view: 'user/welcome' },
    'post /login': 'UserController.login',
    'post /signup': 'UserController.signup',
    '/logout': 'UserController.logout',
    
    'get /gallery/:gallery/:page_num': 'GalleryController.filter_objects',
    'get /gallery/:gallery': 'GalleryController.filter_objects',
    'post /gallery/:gallery': 'GalleryController.filter_objects',
    
    'get /detail/:id': 'Object3DController.detail',
    'get /detail/:id/embed': 'Object3DController.embed',

    // Different URL for same result for external calls
    'get /specimen/mnhn/:col/:code': 'Object3DController.detail_external',
    
    // URL for getting animated image
    'get /thumb3d/mnhn/:col/:code': 'Object3DController.animated_image',
    
    'get /comments/:id': 'Object3DController.get_comments',
    'get /objects/:id': 'Object3DController.get_objects',
    'get /objects': 'Object3DController.get_objects',
    'get /galleries': 'Object3DController.get_galleries',
    'get /collections': 'Object3DController.get_obj_collections',
    'get /allcollections': 'Object3DController.get_all_collections',
    
    'get /download' : 'FileController.download',
    
    '/atlasmaker': { view: 'atlasmaker' },
    
    '/admin/*' : {
         controller: 'admin',
         action: 'index'
    },

    'get /admin/add_object': 'Object3DController.add', // create new object
    'post /admin/add_object': 'Object3DController.create', // save new object

    'get /admin/edit_object/:id': 'Object3DController.edit', // edit existing object
    'post /admin/edit_object/:id': 'Object3DController.save', // save existing object
    
    'get /admin/edit_annotations/:id': 'Object3DController.edit_annotations', // edit 3D model's annotations
    'post /admin/edit_annotations/:id': 'Object3DController.save_annotations', // save 3D model's annotations
    
    'get /admin/delete_object/:id': 'Object3DController.delete', // delete object

    'get /admin/board': { view: 'admin/board' }, // manage users
    'get /admin/manage_users': 'AdminController.manage_users', // manage users
    'get /admin/manage_comments': 'AdminController.manage_comments', // manage comments
    
   
    'post /admin/update_profile/:id': 'AdminController.update_profile', // update user's profile
    'post /admin/delete_comment/:id': 'AdminController.delete_comment', // delete comments
    
    'post /add_comment': 'Object3DController.add_comment', // add comment on object
    
    // footer menu
    'get /about': { view: 'statics/about' },
    'get /contact': { view: 'statics/contact' },
    'get /charter': { view: 'statics/charter' },
    'get /credits': { view: 'statics/credits' },
    'get /legals': { view: 'statics/legals' },
    
    'get /about/en': { view: 'statics/about_en' },
    'get /contact/en': { view: 'statics/contact_en' },
    'get /charter/en': { view: 'statics/charter_en' },
    'get /credits/en': { view: 'statics/credits_en' },
    'get /legals/en': { view: 'statics/legals_en' },
};
