var gulp           = require('gulp'),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		autoprefixer   = require('gulp-autoprefixer'),
		iconfont       = require('gulp-iconfont'),
		iconfontCss    = require('gulp-iconfont-css'),
		notify         = require("gulp-notify");

// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});
// Минификация пользовательских скриптов проекта и JS библиотек в один файл
gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});


// icon fonts
var fontName = 'icons';
// add svg icons to the folder "icons" and use 'iconfont' task for generating icon font
gulp.task( 'iconfont', async () => {
	// где лежат наши иконки
	gulp.src( 'app/icons/*.svg' )
		.pipe( iconfontCss( {
			// где будет наш scss файл
			targetPath   : '../scss/_icons.scss',
			// пути подлючения шрифтов см. в _icons.scss
			fontPath     : '../iconfonts/',
			fontName    : fontName

		} ) )
		.pipe( iconfont( {
			fontName    : fontName,
			formats     : [ 'svg', 'ttf', 'eot', 'woff', 'woff2' ],
			normalize   : true,
			fontHeight  : 1001
		} ) )
		// куда выбрасываем нашу папку с шрифтами
		.pipe( gulp.dest( 'app/iconfonts' ) )
});

gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));
