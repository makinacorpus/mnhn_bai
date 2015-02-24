/**
* Object3D.js
*
* @description :: Object3D
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var fs = require('fs');

module.exports = {

  attributes: {
    title: {
        type: 'string',
        required: true
    },
    title_en: 'string',
    code_mnhn: 'string',
    short_desc: 'string',
    short_desc_en: 'string',
    complete_desc: 'string',
    complete_desc_en: 'string',
    collection: {
        model: 'Collection'
    },
    filename_3D: 'string',
    dim_x: 'integer',
    dim_y: 'integer',
    dim_z: 'integer',
    acquisition_params: 'string',
    acquisition_params_en: 'string',
    filename_flat: 'string',
    filename_sagittal: 'string',
    filename_coronal: 'string',
    filename_axial: 'string',
    preview: 'string',
    preview_animated: 'string',
    published: 'boolean',
    copyright: 'string',
    gallery: {
        model: 'Gallery'
    },
    medias: {
        collection: 'media'
    },
    annotations: {
        collection: 'annotation'
    },
    comments: {
        collection: 'comment'
    },
    associated: {
        collection: 'object3d'
    },

    remove: function(){
        // Destroy media associated
        this.medias.forEach(function(media, index) {
            media.remove();
        });
        // Destroy annotations associated
        this.annotations.forEach(function(annotation, index) {
            annotation.destroy();
        });
        if(this.preview_animated !== undefined) {
            Utils.remove_path(Utils.upload_path(this.preview_animated));
        }
        if(this.filename_flat !== undefined) {
            Utils.remove_path(Utils.upload_path(this.filename_flat));
        }
        if(this.filename_3D !== undefined) {
            Utils.remove_path(Utils.upload_path(this.filename_3D));
        }
        if(this.preview !== undefined) {
            Utils.remove_path(Utils.upload_path(this.preview));
        }
        return this.destroy();
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
    getCodeMNHN: function() {
        return this.code_mnhn;
    },
    getShortDesc: function(lang) {
        if(lang && lang == "en")
            return this.getShortDescEn();
        else
            return this.short_desc;
    },
    getShortDescEn: function() {
        return this.short_desc_en;
    },
    getCompleteDesc: function(cr, lang) {
        ret_val = "";
        if(lang && lang == "en")
            ret_val = this.getCompleteDescEn();
        else
            ret_val = this.complete_desc;
        
        if(cr == true)
            ret_val = ret_val.replace(/\n/g,"<br/>");
        
        return ret_val;
    },
    getCompleteDescEn: function() {
        return this.complete_desc_en;
    },
    getCollection: function() {
        return this.collection;
    },
    getCopyright: function() {
        return this.copyright;
    },
    getFileName3D: function() {
        if(this.filename_3D)
            return '/uploads/' + this.filename_3D;
        else 
            return null;
    },
    getDimX: function() {
        if(this.dim_x)
            return this.dim_x;
        else
            return 0;
    },
    getDimY: function() {
        if(this.dim_y)
            return this.dim_y;
        else
            return 0;
    },
    getDimZ: function() {
        if(this.dim_z)
            return this.dim_z;
        else
            return 0;
    },
    getAcquisitionParams: function(lang) {
        if(lang && lang == "en")
            ret_val = this.getAcquisitionParamsEn();
        else
            ret_val = this.acquisition_params;
        
        return ret_val;
    },
    getAcquisitionParamsEn: function() {
        return this.acquisition_params_en;
    },
    getFileNameFlat: function() {
        return '/uploads/' + this.filename_flat;
    },
    
    getFileNameSagittal: function() {
        return '/uploads/' + this.filename_sagittal;
    },
    getFileNameCoronal: function() {
        return '/uploads/' + this.filename_coronal;
    },
    getFileNameAxial: function() {
        return '/uploads/' + this.filename_axial;
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


