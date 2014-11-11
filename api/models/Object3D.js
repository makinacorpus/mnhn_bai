/**
* Object3D.js
*
* @description :: Object3D
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
        type: 'string',
        required: true
    },
    short_desc: 'string',
    complete_desc: 'string',
    category: 'string',
    filename_3D: 'string',
    filename_flat: 'string',
    preview: 'string',
    preview_animated: 'string',
    published: 'boolean',
    gallery: {
        model: 'Gallery'
    },
    medias: {
        collection: 'media'
    },
    annotations: {
        collection: 'annotation'
    },
    
    getId: function() {
        return this.id;
    },
    getTitle: function() {
        return this.title;
    },
    getShortDesc: function() {
        return this.short_desc;
    },
    getCompleteDesc: function() {
        return this.complete_desc;
    },
    getCategory: function() {
        return this.category;
    },
    getFileName3D: function() {
        return '/uploads/' + this.filename_3D;
    },
    getFileNameFlat: function() {
        return '/uploads/' + this.filename_flat;
    },
    getPreview: function() {
        if(!this.preview || this.preview == '')
            return '/img/default_preview.png';
        return '/uploads/' + this.preview;
    },
    getPreviewAnimated: function() {
        if(!this.preview_animated || this.preview_animated == '')
            return '/img/default_preview.png';
        return '/uploads/' + this.preview_animated;
    },
    getGallery: function() {
        return this.gallery;
    },
    getPublished: function() {
        return this.published;
    },
    getMainImg: function() {
        // TODO
        return "/img/default_detail.png";
    },
    hasFlat: function() {
        if(!this.isEmpty(this.filename_flat))
            return true;
        return false;
    },
    hasShortDesc: function() {
        if(!this.isEmpty(this.short_desc))
            return true;
        return false;
    },
    hasCompleteDesc: function() {
        if(!this.isEmpty(this.complete_desc))
            return true;
        return false;
    },
    hasMedias: function() {
        
    },
    isEmpty: function(pstring) {
        if(pstring == '' || pstring == null)
            return true;
        return false;
    }
    
  }
};

 
