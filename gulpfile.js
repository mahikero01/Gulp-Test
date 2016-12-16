'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var del = require('del');

gulp.task("hello", function(){
    console.log("Hello");
});

gulp.task("default", ["hello"], function (){
    console.log("This is the default task");
});

//concatnate javascripts
gulp.task("concatScripts", function (){
    gulp.src([
        'js/script1.js', 
        'js/script2.js', 
        'js/script3.js']) //pipe is used for connecting methods
    .pipe(maps.init()) // create the maps
    .pipe(concat("app.js"))  // combine the scripts to a file
    .pipe(maps.write('./')) //write the map file where does the gulp.dest
    .pipe(gulp.dest('js'));   // put the file in the folder
});

//minify javascripts
gulp.task("minifyScripts", function (){
    gulp.src('js/app.js') //pipe is used for connecting methods
    .pipe(uglify())  // minify scripts to a file
    .pipe(rename('app.min.js')) //rename the file
    .pipe(gulp.dest('js'));   // put the file in the folder
});

//compile sass to css
gulp.task("compileSass", function (){
    gulp.src('scss/application.scss') //pipe is used for connecting methods
    .pipe(maps.init()) // create the maps
    .pipe(sass())  // compile sass
    .pipe(maps.write('./')) //write the map file where does the gulp.dest
    .pipe(gulp.dest('css'));   // put the file in the folder
});




//Running multiple task in serialized

//concateneate scripts
gulp.task("concatScripts", function (){
    return gulp.src([
        'js/script1.js', 
        'js/script2.js', 
        'js/script3.js']) //pipe is used for connecting methods
    .pipe(maps.init()) // create the maps
    .pipe(concat("app.js"))  // combine the scripts to a file
    .pipe(maps.write('./')) //write the map file where does the gulp.dest
    .pipe(gulp.dest('js'));   // put the file in the folder
});

//minify javascripts
gulp.task("minifyScripts", ['concatScripts'], function (){
    return gulp.src('js/app.js') //pipe is used for connecting methods
    .pipe(uglify())  // minify scripts to a file
    .pipe(rename('app.min.js')) //rename the file
    .pipe(gulp.dest('js'));   // put the file in the folder
});

//compile sass to css
gulp.task("compileSass", function (){
    return gulp.src('scss/application.scss') //pipe is used for connecting methods
    .pipe(maps.init()) // create the maps
    .pipe(sass())  // compile sass
    .pipe(maps.write('./')) //write the map file where does the gulp.dest
    .pipe(gulp.dest('css'));   // put the file in the folder
});

//use for deleteing files
gulp.task('clean', function(){
    del(['dist', 'css/application.css*', 'js/app*.js*']);
});

// this will do the 3 task, these will run at the same time
gulp.task('build', ['minifyScripts', 'compileSass'], function(){
    return gulp.src([
        "css/application.css", 
        "js/app.min.js", 
        "index.html",
        "img/**",
        "fonts/**"], {base: './'})// this will retain the subfolder e.g. css, js 
        .pipe(gulp.dest("dist")); // send all minimize and concat to dist folder
});

//set the build task as default
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});



//this is use for watch and monitoring
gulp.task('watchFiles', function(){
    gulp.watch('scss/**/*.scss',['compileSass']);
    gulp.watch('js/sc*.js', ['concatScripts']);
});