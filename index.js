
var crypto = require('crypto');
var path = require('path');

var assign = require('object-assign');
var gutil = require('gulp-util');
var through = require('through2');

var gulpPlayAssets = function(options) {
  'use restrict';

  return through.obj(function(file, enc, cb) {
    var opts = assign({}, options);

    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new gutil.PluginError('gulp-play-assets', 'Streaming not supported'));
    }

    var stream = crypto.createHash("md5");
    file.pipe(stream);
    var hash = stream.read().toString('hex');

    // original file
    this.push(file);

    // MD5 hash value file
    this.push(new gutil.File({
      cwd: file.cwd,
      base: file.base,
      path: file.path + '.md5',
      contents: new Buffer(hash)
    }));

    // version named file
    this.push(new gutil.File({
      cwd: file.cwd,
      base: file.base,
      path: path.dirname(file.path) + '/' + hash + '-' + path.basename(file.path),
      contents: file.contents
    }));

    cb();
  });
};

module.exports = gulpPlayAssets;
