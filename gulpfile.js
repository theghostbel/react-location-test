var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if (error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if (error.filename) {
    var file = error.filename.split('/');
    message += file[file.length - 1];
  }

  if (error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({
    title: title,
    message: message
  });
};

var staticBundler = browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  fullPaths: true
})

var bundler = watchify(staticBundler);

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'))
}

function deployBundle() {
  return browserify({
      entries: ['./src/app.jsx'],
      transform: [reactify],
      extensions: ['.jsx'],
      fullPaths: true,
      standalone: 'Main'
    })
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'))
}

bundler.on('update', bundle)

gulp.task('build', function() {
  bundle()
});

gulp.task('deploy-build', function() {
  deployBundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if (/main.js/.test(filePath)) {
            cb(true)
          } else if (/style.css/.test(filePath)) {
            cb(true)
          }
        }
      },
      open: true
    }));
});

gulp.task('sass', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'serve', 'sass', 'watch']);

gulp.task('deploy', ['deploy-build', 'sass']);

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
