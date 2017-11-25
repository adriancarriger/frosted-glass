exports.config = {
  bundles: [
    { components: ['my-name'] }
  ],
  collections: [
    { name: '@stencil/router' },
    { name: 'frosted-glass' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
