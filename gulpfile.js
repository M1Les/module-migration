var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var glob = require('glob');


var sections = getSections();

gulp.task('default', [ 'index-html']);

gulp.task('index-html', [
    'vendor-js',
    'app-ts',
    'data-services',
    'services'
], function () {
    return gulp.src('src/index.html')
            .pipe(gulp.dest('./build'))
            .pipe($.htmlReplace({

                'sectionJS':
                    sections
                    .filter(function (section) {
                        return fs.existsSync('build/sections/' + section.section + '/scripts.js');
                    })
                    .map(function (section) {
                        return 'sections/' + section.section + '/scripts.js?rev=@@hash';
                    })
            }))
            .pipe($.revAppend())
            .pipe(gulp.dest('./build'));
});

gulp.task('data-services', function () {
    return gulp.src(['src/data-services/**/!(module)*.ts', 'src/data-services/**/module.ts', 'typings/**/*.ts', 'shim-typings/**/*.ts'])
            .pipe($.sourcemaps.init())
            .pipe($.typescript({
                typescript: require('typescript'),
                sortOutput: true,
                noExternalResolve: false,
                target: "ES5",
                module: "amd",
                moduleResolution: "node",
                allowJs: true,
                outFile: 'data-services.js'
            }))
            .js
            .pipe($.concat('data-services.js'))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('./build'));
});


gulp.task('services', function () {
    return gulp.src(['src/services/**/!(module)*.ts', 'src/services/**/module.ts', 'typings/**/*.ts'])
            .pipe($.sourcemaps.init())
            .pipe($.typescript({
                typescript: require('typescript'),
                sortOutput: true,
                noExternalResolve: false,
                target: "ES5",
                module: "amd",
                moduleResolution: "node",
                allowJs: true,
                outFile: 'services.js'
            }))
            .js
            .pipe($.concat('services.js'))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('./build'));
});

gulp.task('vendor-js', function () {
    return gulp.src(['node_modules/almond/almond.js'])
        //.pipe($.debug())
            .pipe($.sourcemaps.init())
            .pipe($.concat('scripts.js'))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('./build'));
});


gulp.task('app-ts', function () {
    // var sectionModules =
    //     sections.map(function (section) { return ', "tad.sections.' + section.section + '"'; })
    //     .join('');

    return gulp.src(['src/app.ts', 'src/app.bootstrap.ts', 'typings/**/*.ts'])
            .pipe($.sourcemaps.init())
            .pipe($.typescript({
                typescript: require('typescript'),
                sortOutput: true,
                noExternalResolve: false,
                target: "ES5",
                module: "amd",
                moduleResolution: "node",
                allowJs: true,
                outFile: 'app.js'
            }))
            .js
            .pipe($.concat('app.js'))
            .pipe($.sourcemaps.write())
            // .pipe($.replace(/angular\.module\('tad',\s*\[([^\]]*?)\]\)/, 'angular.module("tad", [$1' + sectionModules + '])'))
            .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp
        .watch('src/services/**/*.ts', { interval: 500 }, ['services']);

    gulp
        .watch('src/data-services/**/*.ts', { interval: 500 }, ['data-services']);

    gulp
        .watch(['src/app.ts', 'src/app.bootstrap.ts'], { interval: 500 }, ['app-ts']);
});

function getSections() {
    return [];
    var dirs = glob.sync('src/sections/*/');
    var sections =
        dirs.map(function (dir) {
            return {
                dir: dir,
                section: dir.replace(/src\/sections\/([^/]*?)\//, '$1')
            };
        });

    return sections;
}