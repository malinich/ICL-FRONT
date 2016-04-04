'use strict';
var gulp = require("gulp");
var less = require("gulp-less");
var print = require('gulp-print');
var clean = require("gulp-clean");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var gulpFilter = require('gulp-filter');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');

var sources = {};
sources.scripts = [
    'app/core.js',
    'app/point/*.js',
    'app/urlcore.js',
    'app/http.js',
    'app/app.js'
];

sources.libs = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/angular/angular.js",
    "bower_components/angular-resource/angular-resource.js",
    "bower_components/angular-route/angular-route.js",
    "bower_components/angular-file-upload/dist/angular-file-upload.js",
    "bower_components/d3/d3.js",
    "bower_components/nvd3/build/nv.d3.js",
    "bower_components/angular-nvd3/dist/angular-nvd3.js"

];

gulp.task('clean', function () {
    return gulp.src("dist/")
        .pipe(plumber())
        .pipe(clean({force: true}));
});

gulp.task("conf", function() {
    return gulp.src(["app/conf.json"])
        .pipe(gulp.dest("dist/"))
});

gulp.task("bower", function () {
    var filter = gulpFilter('**/*.js', '!**/*.min.js');

    return gulp.src(sources.libs)
        .pipe(plumber())
        .pipe(filter)
        .pipe(concat("libs.js"))
        .pipe(gulp.dest('dist/js'));
});

gulp.task("app-js", function () {
    var filter = gulpFilter(['**/*.js', '!**/test.js']);
    return gulp.src(sources.scripts)
        .pipe(plumber())
        .pipe(filter)
        .pipe(print())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task("css", function () {
    var filter = gulpFilter(['**/*.js', '!**/test.js']);
    return gulp.src(['bower_components/**/*.css'])
        .pipe(plumber())
        .pipe(print())
        .pipe(gulp.dest('dist/css'))
});

gulp.task("less", function () {
    gulp.src(['app/app.less'])
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
});

gulp.task("app-html", function () {
    return gulp.src(['app/**/*.html'])
        .pipe(plumber())
        .pipe(gulp.dest('dist/template'))
});

gulp.task("express", function(){
    var express = require("express");
    var request = require('request');
    var app = express();

    app.use("/js", express.static("dist/js"));
    app.use("/css", express.static("dist/css"));
    app.use("/conf.json", express.static("dist/conf.json"));

    app.all("/api/*", function (req, res, call) {
        var api = 'http://127.0.0.1:9000';
        var url = api + req.url;
        req.pipe(request(url)).pipe(res);
    });

    app.get("/", function(req, res, next) {
        res.sendFile("template/index.html", {root: "dist/"});
    });

    app.all("/*.html", function (req, res, call) {
        res.sendFile("template/" + req.originalUrl, {root: "dist/"});
    });

    app.listen(9005);
});

gulp.task('dev', function (callback) {
    runSequence('clean', ['bower', 'css', 'less', 'app-js', 'app-html','conf'], callback);
});
