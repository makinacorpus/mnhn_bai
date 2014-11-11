/**
* Comment.js
*
* @description :: Comments on objects
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        comment: 'string',
        author: {
            model: 'User'
        },

        object3d: {
            model: 'Object3D'
        },
        
        getId: function() {
            return this.id;
        },
        
        getComment: function() {
            return this.comment;
        },
        
        getAuthor: function() {
            return this.author;
        },
        
        getUpdated: function() {
            return this.updatedAt;
        },
        
        getObject3d: function() {
            return this.object3d;
        }        
        
    }
};
