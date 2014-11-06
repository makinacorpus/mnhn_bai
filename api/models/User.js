/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'users',
    attributes: {
        username: {
            type: 'string',
            unique: true,
        },
        password: 'string',
        profile: {
            model: 'Profile'
        },
        
        getUserName: function () {
            return this.username;
        },

        getId: function () {
            return this.id;
        },
        
        getProfile: function () {
            return this.profile;
        },
        
        isAdmin: function () {
            if(this.profile)
                return this.profile.isAdmin();
            return false;
        }
    },
    
    /*
     *  Encrypt password
     */
    beforeCreate: function (attrs, next) {
        var bcrypt = require('bcrypt');

        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(attrs.password, salt, function(err, hash) {
                if (err) return next(err);

                attrs.password = hash;
                next();
            });
        });
    }    
  
};

