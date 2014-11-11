var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jest = require('gulp-jest');
var docco = require('gulp-docco');
var folderToc = require('folder-toc');

gulp.task('browserify', function () {
  gulp.src('src/main.js')
    .pipe(browserify({ transform: 'reactify' }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copyindex', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function () {
  gulp.src('__tests__')
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
  gulp.src(['src/*/*js', 'src/*.js'])
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

gulp.task('docsindex', function () {
  folderToc('docs', {
    name: 'index.html',
    layout: 'classic',
    filter: '*.html',
    title: 'Files'
  });
});

gulp.task('default', ['browserify', 'copyindex']);
gulp.task('docs', ['builddocs', 'docsindex']);
