
module.exports = {
  *default(fly) {
    yield fly
      .start('clean')
      .parallel([
        'js',
        'styles',
        'templates',
        'images'
      ])
  },

  *watch(fly) {
    yield fly
      .start('clean')
      .parallel([
        'jswatch',
        'styleswatch',
        'templateswatch',
        'imageswatch'
      ])
  },

  *deploy(fly) {
    yield fly
      .start('default')
      .parallel([
        'jsdeploy',
        'stylesdeploy'
      ])
  },

  *clean(fly) {
    yield fly.clear(`${__dirname}/dist`)
  },


  // js functions
  *js(fly) {
    yield fly
      .source(`${__dirname}/app/**/*.js`)
      .babel({
        presets: ['es2015']
      })
      .target(`${__dirname}/dist`)
      .start('jsdeploy')
  },

  *jswatch(fly) {
    yield fly
      .start('js')
      .watch(`${__dirname}/app/**/*.js`, ['js'])
  },

  *jsdeploy(fly) {
    yield fly
      .source(`${__dirname}/dist/**/*.js`)
      .uglify()
      .rename({
        suffix: '.min'
      })
      .target(`${__dirname}/dist`)
  },

  *cleanjs(fly) {
    yield fly.clear(`${__dirname}/dist/js`)
  },


  // style functions
  *styles(fly) {
    yield fly
      .source(`${__dirname}/app/**/!(_)*.scss`)
      .sass({
        outputStyle: 'expanded',
        includePaths: [
          `${__dirname}/app/styles`,
          `${__dirname}/node_modules/scss-color`,
        ]
      })
      .autoprefixer()
      .target(`${__dirname}/dist`)
      .start('stylesdeploy')
  },

  *styleswatch(fly) {
    yield fly
      .start('styles')
      .watch(`${__dirname}/app/**/*.scss`, ['styles'])
  },

  *stylesdeploy(fly) {
    yield fly
      .source(`${__dirname}/dist/**/*.css`)
      .postcss({
        plugins: [
          require('cssnano')
        ]
      })
      .rename({
        suffix: '.min'
      })
      .target(`${__dirname}/dist`)
  },

  *cleanstyles(fly) {
    yield fly.clear(`${__dirname}/dist/styles`)
  },


  // template functions
  *templates(fly) {
    yield fly
      .source(`${__dirname}/app/templates/**/!(_)*.pug`)
      .pug({
        pretty: true
      })
      .rename((file) => {
        file.dirname = file.dirname.replace('app/templates', 'dist')
      })
      .target('')
  },

  *templateswatch(fly) {
    yield fly
      .start('templates')
      .watch(`${__dirname}/app/templates/**/*.pug`, ['templates'])
  },

  *cleantemplates(fly) {
    yield fly.clear(`${__dirname}/dist/templates`)
  },


  // image functions
  *images(fly) {
    yield fly
      .source(`${__dirname}/app/images/**/*`)
      .target(`${__dirname}/dist/images`)
  },

  *imageswatch(fly) {
    yield fly
      .start('images')
      .watch(`${__dirname}/app/images/**/*`, ['images'])
  },

  *cleanimages(fly) {
    yield fly.clear(`${__dirname}/dist/images`)
  }
}
