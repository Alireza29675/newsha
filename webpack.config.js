module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  watch: true,
  output: {
    filename: './test/index.js',
    sourceMapFilename: './test/index.js.map'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015' ]
      }
    }]
  }
};
