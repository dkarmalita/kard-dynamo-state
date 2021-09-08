module.exports = {
  target: 'node',
  mode: 'production', // 'development' || 'production',
  output: {
    filename: 'index.js',
    library: 'library',
    libraryTarget: 'umd',
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
};
