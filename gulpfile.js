var gulp = require("gulp"),
        markdown = require("gulp-markdown"),
        nano = require("gulp-cssnano"),
        fileInclude = require("gulp-file-include"),
        concat = require("gulp-concat"),
        uglify = require("gulp-uglify"),
        browserify = require("browserify"),
        sourcemaps = require("gulp-sourcemaps"),
        livereload = require("gulp-livereload"),
        htmlmin = require("gulp-htmlmin"),
        autoprefixer = require("gulp-autoprefixer"),
        imagemin = require("gulp-imagemin"),
        cssjoin = require('gulp-import-css'),
        buffer = require("gulp-buffer"),
        autoprefixer = require("gulp-autoprefixer"),
        source = require("vinyl-source-stream"),
        sass = require("gulp-sass");

gulp.task("build-main", ["build-news", "build-statute"], function () {
    return gulp.src("src/**/*.html")
            .pipe(htmlmin())
            .pipe(fileInclude())
            .pipe(gulp.dest("web"));
});

gulp.task("build-statute", function () {
    return gulp.src("content/statute/**/*.{txt,md}")
            .pipe(markdown())
            .pipe(concat("index.html"))
            .pipe(gulp.dest('build/statute'));
});

gulp.task("build-news", function () {
    return gulp.src("content/news/**/*.{txt,md}")
            .pipe(markdown())
            .pipe(concat("index.html"))
            .pipe(gulp.dest('build/news'));
});

gulp.task("build-images", function () {
    return gulp.src("src/images/**/*.{gif,jpg,png}")
            .pipe(imagemin())
            .pipe(gulp.dest("web/images"));
});

gulp.task("build-js", function () {
    return browserify({
        entries: "./src/js/index.js",
        debug: true
    })
            .bundle()
            .pipe(source("index.js"))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("web/js"))
            .pipe(livereload());
});

gulp.task("build-scss", function () {
    return gulp.src("src/scss/**/*.{scss,css}")
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cssjoin())
            .pipe(nano())
            .pipe(gulp.dest("web/css"));
});

gulp.task("watch", function () {
    livereload.listen();
    gulp.watch("src/js/**/*.js", ["build-js"]);
    gulp.watch("content/statute/**/*.{txt,md}", ["build-statute", "build-main"]);
    gulp.watch("content/news/**/*.{txt,md}", ["build-news", "build-main"]);
    gulp.watch("src/**/*.html", ["build-main"]);
    gulp.watch("src/images/**/*.{gif,jpg,png}", ["build-images"]);
});

gulp.task("default", ["build-main", "build-news", "build-images", "build-js", "build-scss"]);