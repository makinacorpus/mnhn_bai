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
    
    'get /gallery/:page_num': 'GalleryController.filter_objects',
    'get /gallery': 'GalleryController.filter_objects',
    'post /gallery': 'GalleryController.filter_objects',
    
    'get /detail/:id': 'Object3DController.detail',
    
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
};
