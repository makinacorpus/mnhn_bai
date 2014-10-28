/**
* Annotation.js
*
* @description :: Annotations on objects
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        title: {
            type: 'string',
            required: true
        },
        description: 'string',
        x: 'integer',
        y: 'integer',
        z: 'integer',
        author: 'string',
        //object3d: {
        //    model: 'Object3D'
        //},
        
        getX: function() {
            return this.x;
        },
        
        getY: function() {
            return this.y;
        },
        
        getZ: function() {
            return this.z;
        },
        
        getTitle: function() {
            return this.title;
        },
        
        getDescription: function() {
            return this.description;
        }
    }
};
