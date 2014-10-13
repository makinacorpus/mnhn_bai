/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'users',
    attributes: {
        username: 'string',
        password: 'string',
        profile: {
            type: 'string',
            required: true
        },
        
        getUserName: function () {
            return this.username;
        },
        
        isAdmin: function () {
            return this.profile == 'admin';
        }
    }
  
};

