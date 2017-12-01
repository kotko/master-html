Master theme for HTML
===================================

Description
------------
This is build for structuring development when working with HTML.

Dependensis
------------
  * [Gulp] (https://github.com/gulpjs/gulp) - gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow.
  * [Stylus] (https://github.com/stylus/stylus) - Stylus is a revolutionary new language, providing an efficient, dynamic, and expressive way to generate CSS. Supporting both an indented syntax and regular CSS style.
  * [Jade] (https://github.com/pugjs/gulp-pug) - This Gulp plugin enables you to compile your Pug templates into HTML or JS, with support for template locals, custom Pug filters, AMD wrapping, and others.
  * [Autoprefixer] (https://github.com/postcss/autoprefixer) - PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. It is recommended by Google and used in Twitter, and Taobao.
  * [imagemin] (https://github.com/sindresorhus/gulp-imagemin) - Minify PNG, JPEG, GIF and SVG.
  * [spritesmith] (https://github.com/otouto/gulp-spritesmith) - plugin for sprite generation, based on spritesmith.
  * [clean] (https://github.com/peter-vilja/gulp-clean) - Removes files and folders.

Directory structure
-------------------

    |-- gulp                    
    |   |-- build
    |   |   |-- assets
    |   |   |   |-- images
    |   |   |   |   |-- icons
    |   |   |   |   |   |-- png
    |   |   |   |   |   |-- svg
    |   |   |   |   |-- img
    |   |   |   |-- js
    |   |   |   |   |-- local
    |   |   |   |   |-- vendor
    |   |   |   |-- styles
    |   |   |       |-- local
    |   |   |       |-- vendor
    |   |   |-- templates
    |   |       |-- blocks
    |   |       |-- pages
    |   |-- public

Requiremets
------------
The minimum requirement by this build [Node.js](https://nodejs.org)

Getting Started
---------------

1. Install gulp globally:
  ```
  $ npm install --global gulp
  ```
2. Initialize your project directory:
  ```
  $ npm i
  ```
3. Run gulp in project directory:
  ```
  $ gulp
  ```
