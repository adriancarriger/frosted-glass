const sass = require('@stencil/sass');

exports.config = {
  namespace: 'frostedglass',
  generateDistribution: true,
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
