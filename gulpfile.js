/**
 * Created by lorenzvercoutere on 16/11/16.
 */

var gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat");

const PATHS= {
    SASS : {
        SRC : './scss/*.scss',
        DEST : './wwwroot/css/'
    }
};

gulp.task("default", function () {
   var sassWatcher = gulp.watch(PATHS.SASS.SRC, ['sass']);
});

gulp.task("sass", function () {
   gulp.src(PATHS.SASS.SRC)
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(concat("main.min.css"))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest(PATHS.SASS.DEST));
});



