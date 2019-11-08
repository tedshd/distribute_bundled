const gulp = require('gulp'),
  watch = require('gulp-watch'),
  webpack = require('webpack-stream'),
  fs = require("fs"),
  execSync = require('child_process').execSync,
  common = '_common',
  lib = '_lib',
  jsPath = './src/js/**/',
  jsDir = './src/js/',
  build = './dist/';

gulp.task('default', function (cb) {
  var options = {};
  watch(jsPath + '*.js', options, function (e) {
    // console.log('e:'+JSON.stringify(e));
    // var filePath = e.history[0].replace(e.base, '');
    var path = e.history[0].replace(e.cwd, '');
    var files2Build = [];
    console.log('\n');
    console.log(new Date() + ' -- ' + path);

    var ts = new Date().getTime();

    (async () => {

      if (path.search(common) !== -1 ||
        path.search(lib) !== -1
      ) {
        function checkBuildingFiles () {
          return new Promise((resolve, rejection) => {

            fs.readdir(jsDir, (err, files) => {
              let tmp = [];
              files.forEach((file) => {
                if (file.search('.js') !== -1) {
                  file = jsDir + file;
                  tmp.push(file);
                }
              });
              resolve(tmp);
            });

          });
        }
        files2Build = await checkBuildingFiles();
      } else {
        files2Build.push('.' + path);
      }

      console.log(files2Build);

      // gulp.src(files2Build)
      // .pipe(webpack())
      // .pipe(gulp.dest('dist/'));

      var entryObj = {};
      for (let i = 0; i < files2Build.length; i++) {
        var name = files2Build[i].replace(jsDir, '').replace('.js', '') + '-';
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
