/**
* Collection.js
*
* @description :: Collection
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    category: 'string',
    name: 'string',
    short_name: 'string',

    getId: function() {
        return this.id;
    },
    getCategory: function() {
        return this.category;
    },
    getName: function() {
        return this.name;
    },
    getShortName: function() {
        return this.short_name;
    }
  }
};
