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
    if (req.user && req.user.isAdmin()) {
        console.log("User allowed : " + req.user.username + " ( " + req.user.profile + " )");
        next();
    } else {
        console.log("You are not allowed to view this page");
        res.redirect('/404');
    }
  }
};

