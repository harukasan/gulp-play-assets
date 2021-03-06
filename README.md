# gulp-play-assets

[![](https://img.shields.io/npm/v/gulp-play-assets.svg?style=flat-square)![npm](https://img.shields.io/npm/dm/gulp-play-assets.svg?style=flat-square)](https://www.npmjs.com/package/gulp-play-assets)
[![travis-ci](https://img.shields.io/travis/harukasan/gulp-play-assets.svg?style=flat-square)](https://travis-ci.org/harukasan/gulp-play-assets)

Build asset files compatible to versioned asset files of play framework 2.3 or later.

## Install

```
npm install gulp-play-assets --save-dev
```

## Usage

```js
var gulp = require('gulp');
var playAssets = require('gulp-play-assets');

gulp.task('build', function() {
  gulp.src('assets/**')
    .pipe(playAssets())
    .pipe(gulp.dest('./public'));
```

It genarates below files from `assets/stylesheets/application.css`:

```
public/stylesheets/application.css
public/stylesheets/application.css.md5
public/stylesheets/MD5HASHVALUES-application.css
```

If you need zipped files, you can use with gulp-gzip:

```js
var gulp = require('gulp');
var playAssets = require('gulp-play-assets');
var gzip = require('gulp-gzip');

gulp.task('build', function() {
  gulp.src('assets/**')
    .pipe(playAssets())
    .pipe(gulp.dest('./public')); // output unzipped files
    .pipe(gzip({ append: true }))
    .pipe(gulp.dest('./public')); // output zipped files
```

It generates below files:

```
public/stylesheets/application.css
public/stylesheets/application.css.gz
public/stylesheets/application.css.md5
public/stylesheets/application.css.md5.gz
public/stylesheets/MD5HASHVALUES-application.css
public/stylesheets/MD5HASHVALUES-application.css.gz
```

## References:

- http://d.hatena.ne.jp/nazoking/20141207/1417964951 (in Japanese)

## Lisense

Copyright (c) 2015 MICHII Shunsuke, All Rights Reserved.

Lisensed under Apache License 2.0. See [LICENSE](./LICENSE)
