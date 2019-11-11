# distribute_bundled
Auto distribute bundled js for used page, not bundle together

## Use

* gulp

* webpack

```
npm i --save-dev gulp
npm i --save-dev gulp-watch
npm i --save-dev gulp-cssnano
npm i --save-dev gulp-cssnext
npm i --save-dev gulp-postcss
npm i --save-dev gulp-rename
npm i --save-dev gulp-uglify
npm i --save-dev postcss-apply
npm i --save-dev postcss-css-variables
npm i --save-dev autoprefixer
npm i --save-dev webpack
npm i --save-dev webpack-stream
npm i --save-dev gulp-cssimport
```

## gulp

suggest version 4 up

## Webpack

suggest version 4 up

## Structure

For production is `dist`

developr is `src`

You can set up in `gulpfile.js`

`_common` & `_lib` put common function or library for import

css files are same as js files.

## Flow

entry

```
src/js/page.js
src/js/page2.js
```

output

```
dist/page_1573200585178.js
dist/page2_1573200585178.js
```