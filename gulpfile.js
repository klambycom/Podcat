var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    jest = require('gulp-jest');

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

gulp.task('default', ['browserify', 'copyindex']);
