var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var sass = require('gulp-sass');
var filter = require('gulp-filter');

function compile(watch) {
    var bundler = watchify(browserify('./grails-app/assets/javascripts/src/app.js', { debug: true }).transform(babel, {
        compact: false,
        optional: ["es7.classProperties", "es7.decorators"]
    }));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./grails-app/assets/javascripts/dist'));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
            console.log('-> bundle complete. watching again...');
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('sass', function () {
    return gulp.src('./grails-app/assets/stylesheets/src/app.scss')
        .pipe(sass({
            require: ['./sass/functions/url64.rb']
        }))
        .on('error', gutil.log.bind(gutil, 'Sass Error'))
        .pipe(gulp.dest('./grails-app/assets/stylesheets/src/dist'))
        .pipe(filter('**/*.css'));
});

gulp.task('watch-sass', function () {
    return gulp.watch('./grails-app/assets/stylesheets/src/**/*.scss', ['sass']);
});


gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch', 'watch-sass']);