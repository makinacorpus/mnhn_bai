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

        User.findOne().where({username: req.param('username')}).exec(function (err, user) {
            if (err)
                res.json({ error: 'DB error' }, 500);

            if (user) {
                bcrypt.compare(req.param('password'), user.password, function (err, match) {
                    if (err)
                        res.json({ error: 'Server error' }, 500);

                    if (match) {
                        // password match
                        req.session.user = user.id;
                        res.json(user);
                        //res.redirect('/welcome');
                        req.login(user, function (err) {
                            if (err) return res.negotiate(err);
                            return res.redirect('/welcome');
                        });
                    } else {
                        // invalid password
                        // TODO: add proper view
                        if (req.session.user)
                            req.session.user = null;                        
                        return res.json({ error: 'Invalid password' }, 400);
                    }
                });
            } else {
                // TODO: add proper view
                return res.json({ error: 'User not found' }, 404);
            }
        });
    },
  

  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    req.logout();
    //return res.ok('Logged out successfully.');
    return res.redirect('/');
  },


    /**
    * `UserController.signup()`
    */
    signup: function (req, res) {
      
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

