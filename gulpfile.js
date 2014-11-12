var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jest = require('gulp-jest');
var docco = require('gulp-docco');
var folderToc = require('folder-toc');
var git = require('gulp-git');
var jshint = require('gulp-jshint');
var react = require('gulp-react');

gulp.task('browserify', function () {
  return gulp.src('src/main.js')
    .pipe(browserify({ transform: 'reactify' }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copyindex', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-to-tmp', function () {
  return gulp.src('./src/**/*.js')
    .pipe(gulp.dest('./tmp'));
});

gulp.task('compile-jsx', ['copy-to-tmp'], function () {
  return gulp.src('./tmp/**/*.js')
    .pipe(react())
    .pipe(gulp.dest('./build'));
});

gulp.task('lint', ['compile-jsx'], function () {
  return gulp.src('./build/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
  return gulp.src('__tests__')
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
  return gulp.src(['src/*/*.js', 'src/*.js'])
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

gulp.task('docsindex', function () {
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

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['browserify', 'copyindex']);
});

gulp.task('default', ['browserify', 'copyindex']);
gulp.task('docs', ['builddocs', 'docsindex']);
