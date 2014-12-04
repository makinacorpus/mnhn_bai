/**
* Media.js
*
* @description :: Media
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        title: {
            type: 'string',
            required: true
        },
        type: 'string',
        path: 'string',
        filename:'string',
        /*object3d: {
            model: 'Object3D'
        },*/

        remove: function() {
            if(this.path !== undefined) {
                Utils.remove_path(this.path);
            }
            return this.destroy();
        },
        
        getId: function() {
            return this.id;
        },
        getTitle: function() {
            return this.title;
        },
        getType: function() {
            return this.type;
        },
        getPath: function() {
            return this.path;
        },
        getObject3D: function() {
            return this.object3d;
        },
        getUrl: function() {
            return '/uploads/' + this.filename ;
        }        ,
        isImage: function() {
            if(this.type) {
                var n = this.type.indexOf("image"); 
                if(n != -1)
                    return true;
            }
            return false;
        }        
    }
};

 
