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
    /*obj3d: {
        collection: 'Object3D',
        via: 'gallery'
    },*/
    obj3d: {
        model: 'object3d',
        via: 'gallery'
    },
    
    parent: {
        model: 'Gallery'
    },

    getId: function() {
        return this.id;
    },
    
    getTitle: function(lang) {
        if(lang && lang == "en")
            return this.getTitleEn()
        else
            return this.title;
    },
    getTitleEn: function() {
        return this.title_en;
    },
    
    getParent: function() {
        return this.parent;
    }
  }
};

 
