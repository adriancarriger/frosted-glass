exports.config = {
  namespace: 'frostedvanilla',
  generateDistribution: true,
  bundles: [
    { components: ['frosted-vanilla'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
