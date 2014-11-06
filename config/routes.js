module.exports.routes = {

     '/*': function(req, res, next) {
         res.setLocale(req.session.lang);
         return next();
     },
    
//     '/admin/*': function(req, res, next) {
//         res.setLocale(req.param('lang') || req.session.lang);
//         return next();
//     },
//     
    '/:lang/': function(req, res, next) {
        req.session.lang = req.param('lang');
        return res.redirect('/');
     },
    //'/:lang/': 'I18nController.index',

    '/': { view: 'home' },
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
    
    'get /admin/delete_object/:id': 'Object3DController.delete', // delete object

    'get /admin/board': { view: 'admin/board' }, // manage users
    'get /admin/manage_users': 'AdminController.manage_users', // manage users
    
    'post /admin/update_profile/:id': 'AdminController.update_profile', // update user's profile
    
    // footer menu
    'get /about': { view: 'statics/about' },
    'get /contact': { view: 'statics/contact' },
    'get /charter': { view: 'statics/charter' },
    'get /credits': { view: 'statics/credits' },
    'get /legals': { view: 'statics/legals' },
};
