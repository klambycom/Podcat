var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jest = require('gulp-jest');
var docco = require('gulp-docco');
var folderToc = require('folder-toc');
var git = require('gulp-git');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var react = require('gulp-react');

var paths = {
  dist:   'dist',
  main:   'src/main.js',
  index:  'src/index.html',
  src:    'src/**/*.{js,jsx}',
  tests:  '__tests__',
  style:  'src/scss/*.scss',
  scss:   'src/scss/**/*.scss',
  docs:   './docs'
};

gulp.task('browserify', function () {
  return gulp.src(paths.main)
    .pipe(browserify({ transform: 'reactify' }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copyindex', function () {
  return gulp.src(paths.index)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('lint', function () {
  return gulp.src(paths.src)
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
  return gulp.src(paths.tests)
    .pipe(jest({
      testDirectoryName: 'spec',
      scriptPreprocessor: './support/preprocessor.js',
      unmockedModulePathPatterns: ['node_modules/react'],
      testPathIgnorePatterns: [
        "node_modules",
        "./support"
      ]
    }));
});

gulp.task('builddocs', function () {
  return gulp.src(paths.src)
    .pipe(docco())
    .pipe(gulp.dest(paths.docs));
});

gulp.task('docsindex', ['builddocs'], function () {
  return folderToc('docs', {
    name: 'index.html',
    layout: 'classic',
    filter: '*.html',
    title: 'Files'
  });
});

gulp.task('deploy', function () {
  return git.checkout('gh-pages', function (err) {
    if (err) throw err;

    return gulp.src(['docs', 'dist'])
      .pipe(git.add())
      .pipe(git.commit('Update'))
      .pipe(git.push('origin', 'gh-pages', function (err) {
        if (err) throw err;
      }));
  });
});

gulp.task('sass', function () {
  return gulp.src(paths.style)
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
  gulp.watch(paths.index, ['copyindex']);
  gulp.watch(paths.src, ['browserify']);
  gulp.watch(paths.scss, ['sass']);
});

gulp.task('default', ['browserify', 'copyindex', 'sass']);
gulp.task('docs', ['builddocs', 'docsindex']);
