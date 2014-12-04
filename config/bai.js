var fs = require('fs')
  , path = require('path');
module.exports.data = {
    maxsinglesize: 500*1024*1024,
    maxsize: 500*1024*1024,
    __pathData: path.join(process.cwd(), '.tmp/uploads'),
    __uploadData: path.join(process.cwd(), '.tmp/tmp_uploads')
};
