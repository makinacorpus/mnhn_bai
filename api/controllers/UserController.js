/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
    * `UserController.login()`
    */
//     login: function (req, res) {
//         return res.login({
//             successRedirect: '/'
//         });
//     },

    login: function (req, res) {
        var bcrypt = require('bcrypt');

        User.findOne().populate('profile').where({username: req.param('username')}).exec(function (err, user) {
            if (err)
                res.json({ error: req.__('DB error') }, 500);

            if (user) {
                bcrypt.compare(req.param('password'), user.password, function (err, match) {
                    if (err)
                        res.json({ error: req.__('Server error') }, 500);

                    if (match) {
                        // password match
                        //req.session.user = user.id;
                        //req.session.user = user;
                        //res.json(user);
                        req.login(user, function (err) {
                            if (err) return res.negotiate(err);
                            //console.log(req.user.profile);
                            req.session.isadmin = user.isAdmin();
                            if(user.isAdmin())
                                return res.redirect('/admin/board');
                            else
                                return res.redirect('/welcome');
                         });
                    } else {
                        // invalid password
                        if (req.session.user)
                            req.session.user = null;                     
                        res.view('user/login', {error: req.__('Invalid password')});
                    }
                });
            } else {
                res.view('user/login', {error: req.__('Invalid username')});
            }
        });
    },
  

  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    req.logout();
    req.session.isadmin = false;
    //return res.ok('Logged out successfully.');
    return res.redirect('/');
  },


    /**
    * `UserController.signup()`
    */
    signup: function (req, res) {
      
        User.findOne().populate('profile').where({username: req.param('username')}).exec(function (err, user) {
            if (err)
                res.json({ error: 'DB error' }, 500);

            if (user) {
                res.view('user/signup', {error: req.__('This username is already used, please choose another one')});
            }
        });
        
        User.create(req.params.all()).exec(function (err, user) {
            if (err)
                return res.negotiate(err);
            
            req.login(user, function (err) {
                if (err) return res.negotiate(err);
                return res.redirect('/welcome');
            });
        });
    }
};

