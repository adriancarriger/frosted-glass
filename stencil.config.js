exports.config = {
  namespace: 'frostedglass',
  generateDistribution: true,
  bundles: [
    { components: ['frosted-glass-container', 'frosted-glass'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
