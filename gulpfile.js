var gulp=require("gulp"); //本地gulp
var less = require('gulp-less'); // 引入less
var path = require('path');
var autoprefixer = require('gulp-autoprefixer'); //css添加前缀
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

// require 加载 browser-sync 模块
var browserSync = require("browser-sync").create();
//本地数据跨域处理，服务器不涉及
var proxy = require('http-proxy-middleware');
var plumber = require('gulp-plumber');//阻止gulp插件发生错误导致进程中断
//编译less
gulp.task('less', function () {
return gulp.src('src/css/**/*.less')
	.pipe(plumber())
    //编译less
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))  
    .pipe(autoprefixer({
      browsers: ['last 20 versions','last 3 Explorer versions','Firefox >= 20'],
      cascade: true,
      remove:true
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('style.min.css'))   // 重命名css
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
});

//定义服务器任务添加监控
gulp.task('server',function(){
	//端口代理跨域用
	var middleware = proxy(
		['/api'], 
		{
			target: "http://10.98.24.67:8082", 
			changeOrigin: true, 
			pathRewrite: {
            	'^/api' : '',
        	}
    	}
    );
    browserSync.init({
        server: {
         baseDir:["./src"],
         index:"index.html",
         middleware: middleware           
        },
        files: ["src/css/**/*.less", "src/js/**/*.js","src/**/*.html"],//添加监控文件
        port:8082,
       
    });
    gulp.watch("src/css/*.less",["less"]);
    gulp.watch("src/*.html").on('change', browserSync.reload);
})

