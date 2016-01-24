var gulp = require("gulp"),
        webserver = require("gulp-webserver"),
        path = require("path"),
        markdown = require("gulp-markdown"),
        gulpif = require("gulp-if"),
        nano = require("gulp-cssnano"),
        fileInclude = require("gulp-file-include"),
        concat = require("gulp-concat"),
        uglify = require("gulp-uglify"),
        browserify = require("browserify"),
        livereload = require("gulp-livereload"),
        htmlmin = require("gulp-htmlmin"),
        autoprefixer = require("gulp-autoprefixer"),
        imagemin = require("gulp-imagemin"),
        cssjoin = require('gulp-import-css'),
        buffer = require("gulp-buffer"),
        autoprefixer = require("gulp-autoprefixer"),
        source = require("vinyl-source-stream"),
        sass = require("gulp-sass"),
        stream = require('stream'),
        util = require("gulp-util"),
        sprintf = require("sprintf"),
        ghPages = require("gulp-gh-pages");

var sectionize = function () {
    var transformStream = new stream.Transform({objectMode: true});
    transformStream._transform = function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
        }
        if (file.isBuffer()) {
            file.contents = new Buffer(sprintf("<section id='%s'>%s</section>", path.basename(file.path, ".html"), file.contents.toString(enc)));
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            return cb(new util.PluginError("sectionize", 'Streaming not supported'));
        }
        cb(null, file);
    };
    return transformStream;
};

gulp.task("copy-robots", function () {
    return gulp.src([
        "robots.txt",
        "CNAME"
    ])
            .pipe(gulp.dest("web"));
});

gulp.task("copy-fonts", function () {
    return gulp.src([
        "bower_components/WebFont-OpenSans/fonts/**",
        "bower_components/font-awesome/fonts/**"
    ]).pipe(gulp.dest("web/fonts"))
});

gulp.task("build-main", ["build-news", "build-statute"], function () {
    return gulp.src("src/**/*.html")
            .pipe(fileInclude())
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest("web"))
            .pipe(livereload());
});

gulp.task("build-statute", function () {
    return gulp.src("content/statute/**/*.{txt,md}")
            .pipe(markdown())
            .pipe(sectionize())
            .pipe(concat("index.html"))
            .pipe(gulp.dest('build/statute'))
            .pipe(livereload());
});

gulp.task("build-news", function () {
    return gulp.src("content/news/**/*.{txt,md}")
            .pipe(markdown())
            .pipe(sectionize())
            .pipe(concat("index.html"))
            .pipe(gulp.dest('build/news'))
            .pipe(livereload());
});

gulp.task("build-images", function () {
    return gulp.src("src/images/**/*.{gif,jpg,png}")
            .pipe(imagemin())
            .pipe(gulp.dest("web/images"))
            .pipe(livereload());
});

gulp.task("build-js", function () {
    return browserify({
        entries: "./src/js/index.js",
        debug: true
    })
            .bundle()
            .pipe(source("index.js"))
            .pipe(buffer())
            .pipe(gulp.dest("web/js"))
            .pipe(gulpif(util.env.production, uglify()))
            .pipe(livereload());
});

gulp.task("build-scss", function () {
    return gulp.src("src/scss/**/*.{scss,css}")
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cssjoin())
            .pipe(nano())
            .pipe(gulp.dest("web/css"))
            .pipe(livereload());
});

gulp.task("watch", function () {
    livereload.listen();
    gulp.watch("src/js/**/*.js", ["build-js"]);
    gulp.watch("src/scss/**/*", ["build-scss"]);
    gulp.watch("content/statute/**/*.{txt,md}", ["build-statute", "build-main"]);
    gulp.watch("content/news/**/*.{txt,md}", ["build-news", "build-main"]);
    gulp.watch("src/**/*.html", ["build-main"]);
    gulp.watch("src/images/**/*.{gif,jpg,png}", ["build-images"]);
});

gulp.task("default", ["build", "watch"], function () {
    gulp.src('web')
            .pipe(webserver({
                livereload: false,
                directoryListing: false,
                open: true
            }));
});

gulp.task("build", ["copy-fonts", "copy-robots", "build-main", "build-news", "build-images", "build-js", "build-scss"]);

gulp.task("deploy", ["build"], function () {
    return gulp.src("web/**/*")
            .pipe(ghPages());
});
