/**
* Gallery.js
*
* @description :: Gallery
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: 'string',
    desc: 'string',
    obj3d: {
        collection: 'Object3D',
        via: 'gallery'
    },
    
    getTitle: function() {
        return this.title;
    }
  }
};

 
