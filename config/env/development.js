/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *

   models: {
     connection: 'baiPostgresqlServer'
   },
   ***************************************************************************/

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

   port: 3000,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  log: {
    level: "debug"
  }

};

module.exports.connections = {

  baiPostgresqlServer: {
    adapter: 'sails-postgresql',
    host: '127.0.0.1',
    user: 'gisuser',
    password: 'Rivirwaktim9',
    database: 'bai'
  }
};


module.exports.data = {
    __pathData: '/home/sbe/projects/mnhn_bai/.tmp/uploads/',
    __uploadData: '/home/sbe/projects/mnhn_bai/.tmp/uploads/'
};

module.exports.urls = {
    __mnhn: 'http://coldb.mnhn.fr/catalognumber/mnhn/'
};
