var assert = require('assert');
var File = require('vinyl');
var playAssets = require('../');

describe('gulp-play-assets', function() {
  it('should pass null file', function(done) {
    var subject = new File({
      'isnull': function () {
        return true;
      }
    });

    var stream = playAssets();
    stream.on('data', function(file) {
      assert.deepEqual(file, subject);
      done();
    });
    stream.write(subject);
  });

  it('should pass original file', function(done) {
    var subject = new File({
      cwd: '/test',
      base: '/test',
      path: '/test/yo',
      contents: new Buffer('Yo')
    });

    var stream = playAssets();
    stream.on('data', function(file) {
      if (file.path == subject.path) {
        assert.equal(file.contents.toString('utf8'), subject.contents.toString('utf8'));
        done();
      }
    });
    stream.write(subject);
  });

  it('should build md5 file', function(done) {
    var subject = new File({
      cwd: '/test',
      base: '/test',
      path: '/test/yo',
      contents: new Buffer('Yo')
    });

    var stream = playAssets();
    stream.on('data', function(file) {
      if (/\.md5$/.test(file.path)) {
        assert.equal(file.cwd, subject.cwd);
        assert.equal(file.base, subject.base);
        assert.equal(file.path, subject.path + '.md5');
        assert.equal(file.contents.toString('utf8'), '3700f097e741a7702f7e4ac61ed88c1a');
        done();
      }
    });
    stream.write(subject);
  });

  it('should pass hash named file', function(done) {
    var subject = new File({
      cwd: '/test',
      base: '/test',
      path: '/test/yo',
      contents: new Buffer('Yo')
    });

    var stream = playAssets();
    stream.on('data', function(file) {
      if (/\-yo$/.test(file.path)) {
        assert.equal(file.cwd, subject.cwd);
        assert.equal(file.base, subject.base);
        assert.equal(file.path, '/test/3700f097e741a7702f7e4ac61ed88c1a-yo');
        assert.equal(file.contents.toString('utf8'), subject.contents.toString('utf8'));
        done();
      }
    });
    stream.write(subject);
  });
});
