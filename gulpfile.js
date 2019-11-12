const gulp = require('gulp'),
  watch = require('gulp-watch'),
  cssnano = require('gulp-cssnano'),
  cssimport = require("gulp-cssimport"),
  rename = require("gulp-rename"),
  autoprefixer = require('autoprefixer'),
  postcssApply = require('postcss-apply'),
  postcssVar = require('postcss-css-variables'),
  postcss = require('gulp-postcss'),
  webpack = require('webpack-stream'),
  fs = require("fs"),
  execSync = require('child_process').execSync,
  processors = [
    autoprefixer({ browsers: ['last 2 version'] }),
    postcssApply,
    postcssVar
  ],
  common = '_common',
  lib = '_lib',
  cssPath = './src/css/**/',
  cssDir = './src/css/',
  jsPath = './src/js/**/',
  jsDir = './src/js/',
  build = './dist/';

gulp.task('default', function (cb) {
  var options = {};
  // watch css
  watch(cssPath + '*.css', options, function (e) {
    // console.log('e:'+JSON.stringify(e));
    // console.log(new Date() + ' -- ' + e.history[0].replace(e.base, ''));
    var path = e.history[0].replace(e.cwd, '');
    console.log('\n');
    console.log(new Date() + ' -- ' + path);

    var ts = new Date().getTime();

    (async () => {
      var files2Build = await buildFiles(path, cssDir, '.css');

      console.log(files2Build);

      for (let i = 0; i < files2Build.length; i++) {
        var name = files2Build[i].replace(cssDir, '').replace('.css', '') + '_';

        // delete old file
        execSync('find . -name "' + name + '*" -delete');
      }
      gulp.src(files2Build)
        .pipe(cssimport())
        .pipe(postcss(processors))
        .pipe(cssnano())
        .pipe(rename(function (path) {
          path.basename = path.basename + '_' + ts;
        }))
        .pipe(gulp.dest(build));
    })();

  });
  // watch js
  watch(jsPath + '*.js', options, function (e) {
    // console.log('e:'+JSON.stringify(e));
    // var filePath = e.history[0].replace(e.base, '');
    var path = e.history[0].replace(e.cwd, '');
    console.log('\n');
    console.log(new Date() + ' -- ' + path);

    var ts = new Date().getTime();

    (async () => {
      var files2Build = await buildFiles(path, jsDir, '.js');

      console.log(files2Build);

      var entryObj = {};
      for (let i = 0; i < files2Build.length; i++) {
        var name = files2Build[i].replace(jsDir, '').replace('.js', '') + '_';
        entryObj[name + ts] = files2Build[i];

        // delete old file
        execSync('find . -name "' + name + '*" -delete');
      }

      gulp.src(files2Build)
        .pipe(webpack({
          entry: entryObj,
          output: {
            filename: '[name].js',
          },
          mode: 'production',
        }))
        .pipe(gulp.dest(build));

    })();

  });
});

function checkBuildingFiles (dir, fileType) {
  return new Promise((resolve, rejection) => {

    fs.readdir(dir, (err, files) => {
      let tmp = [];
      files.forEach((file) => {
        if (file.search(fileType) !== -1) {
          file = dir + file;
          tmp.push(file);
        }
      });
      resolve(tmp);
    });

  });
}

async function buildFiles (path, dir, fileType) {
  var arr = [];
  if (path.search(common) !== -1 ||
    path.search(lib) !== -1
  ) {
    arr = await checkBuildingFiles(dir, fileType);
  } else {
    arr.push('.' + path);
  }
  return arr;
}
