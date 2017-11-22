exports.config = {
  namespace: 'frosted-glass',
  generateDistribution: true,
  generateWWW: false,
  bundles: [
    { components: ['frosted-glass'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
