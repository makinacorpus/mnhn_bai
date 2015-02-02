/**
 * AdminController
 *
 * @description :: Server-side logic for managing admin pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `AdminControllerController.index()`
   */
  index: function (req, res, next) {
    //if (req.user && req.user.profile == "admin") {
    //if (req.user && req.user.isAdmin()) {
    if (req.user && req.session.isadmin) {
        //console.log("User allowed : " + req.user.username + " ( " + req.user.profile + " )");
        next();
    } else {
        console.log("You are not allowed to view this page");
        res.redirect('/404');
    }
  },
  
  /**
   * `AdminControllerController.manage_users()`
   */
  manage_users: function (req, res) {
        
        // Get profiles
        Profile.find().exec(function(err, profiles) {
            // Get users infos
            User.find().populate('profile').exec(function(err, users) {
                if(err) {
                    //return res.error();
                    return err;
                }
                
                // Launch manage view
                res.view('admin/user_manage', {users: users, profiles: profiles});
            });
        });
  },
  

  /**
   * `AdminControllerController.manage_galleries()`
   */
  manage_galleries: function (req, res) {
        
        // Get galleries
        Gallery.find().exec(function(err, galleries) {
            // Launch manage view
            res.view('admin/gallery_manage', {galleries: galleries, gallery_list: galleries});
        });
  },

  
  /**
   * `AdminControllerController.update_gallery()`
   */
  update_gallery: function (req, res) {
        var id = req.param('id');
        var parent = req.param('parent')
        
        // Get galleries
        Gallery.findOne({id: id}).exec(function(err, gallery) {
            gallery.parent = parent;
            gallery.save();
            return  res.json({status: true});
        });
  },

  
  /**
   * `AdminControllerController.manage_comments()`
   */
  manage_comments: function (req, res) {
        
        // Get comments
        Comment.find().populate('author').exec(function(err, comments) {
            if(err) {
                //return res.error();
                return err;
            }
            
            // Launch manage view
            res.view('admin/comment_manage', {comments: comments});
        });
  },


  /**
   * `AdminControllerController.manage_objects()`
   */
  manage_objects: function (req, res) {
        
        // Get all objects
        Object3D.find().exec(function(err, objects) {
            if(err) {
                //return res.error();
                return err;
            }
            
            // Launch manage view
            res.view('admin/object_manage', {objects: objects});
        });
  },

  
  /**
   * `AdminControllerController.update_profile()`
   */
  update_profile: function (req, res) {
        var id = req.param('id');
        var profile = req.param('profile')
        
        // Get profiles
        User.findOne({id: id}).exec(function(err, user) {
            user.profile = profile;
            user.save();
            return  res.json({status: true});
        });
  },

  
  /**
   * `AdminControllerController.delete_comment()`
   */
  delete_comment: function (req, res) {
        var id = req.param('id');
        
        // Get comment
        Comment.findOne({id: id}).exec(function(err, comment) {
            comment.destroy();
            return  res.json({status: true});
        });
  }
  
  
};

