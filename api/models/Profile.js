/**
* Profile.js
*
* @description :: Profile
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: 'string',
    
    isAdmin: function() {
        return this.name == 'admin';
    },
    
    isEditor: function() {
        return this.name == 'editor';
    },

    getName: function() {
        return this.name;
    },
    
    getId: function() {
        return this.id;
    }
    
  }
};

 
