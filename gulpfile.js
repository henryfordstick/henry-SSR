const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');

const _entry = './src/server/**/*';
const cleanEntry = './src/server/config/index.js';

// 生产环境
function buildDev(){
  return watch(
    _entry,
    {
      ignoreInitial: false,
    },
    function() {
      gulp.src(_entry)
        .pipe(
          babel({
            babelrc: false,
            presets: ['@babel/preset-typescript'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-transform-modules-commonjs"
            ],
          })
        )
        .pipe(gulp.dest('dist'));
    }
  );
}

// 上线环境
function buildProd(){
  return gulp.src(_entry)
    .pipe(
      babel({
        babelrc: false,
        plugins: [
          "@babel/plugin-proposal-decorators",
          "@babel/plugin-transform-modules-commonjs"
        ],
        ignore: [ cleanEntry ],
      })
    )
    .pipe(gulp.dest('dist'));
}

// 代码检查
function buildLint(){
  return gulp
    .src(_entry)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// 清洗
function buildConfig() {
  return  gulp.src(_entry)
    .pipe(rollup({
      input: cleanEntry,
      output: {
        format: 'cjs',
      },
      plugins: [replace({'process.env.NODE_ENV':JSON.stringify('production')})]

    }))
    .pipe(gulp.dest('dist'))
}

let build = gulp.series(buildDev);

if(process.env.NODE_ENV === "production"){
  build = gulp.series(buildProd,buildConfig);
}

if(process.env.NODE_ENV === "lint"){
  build = gulp.series(buildLint);
}

gulp.task('default',build);