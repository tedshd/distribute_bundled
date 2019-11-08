# distribute_bundled
Auto distribute bundled js for used page, not bundle together

## Use

* gulp

* webpack

## gulp

```
npm i --save-dev gulp
npm i --save-dev gulp-watch
npm i --save-dev webpack-stream
```

## Webpack

suggest version 4 up

```
npm i --save-dev webpack
```

## Structure

For production is `dist`

developr is `src`

You can set up in `gulpfile.js`

`_common` & `_lib` put common function or library for import

## Flow

entry

```
src/js/page.js
src/js/page2.js
```

output

```
dist/page-1573200585178.js
dist/page2-1573200585178.js
```