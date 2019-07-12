const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
   .react('resources/js/app.js', 'django_project/blog/static/blog')
   .sass('resources/sass/main.scss', 'django_project/blog/static/blog')
   .options({
       postCss: [
           require('autoprefixer')({
               browsers: ['>1%'],
               grid: true
           })
       ]
   })
   .browserSync({
      files: "**/*",
      // files: "*.html, css/*.css",
      browser: 'Firefox',
      proxy: 'http://127.0.0.1:8000/'
    //   server: { baseDir: ['public'] }
   })
   .disableNotifications();

