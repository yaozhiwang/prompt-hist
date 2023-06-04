const { merge } = require('webpack-merge')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const srcDir = path.join(__dirname, '.', 'src')

const commonConfig = {
  entry: {
    content: path.join(srcDir, 'scripts/content.ts')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.resolve('src/static'), to: path.resolve('dist') }],
      options: {}
    })
  ]
}

const productionConfig = {
  mode: 'production',
  devtool: 'source-map'
}

const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map'
}

module.exports = (_env, argv) => {
  if (argv.mode === 'production') {
    return merge(commonConfig, productionConfig)
  }
  if (argv.mode === 'development') {
    return merge(commonConfig, developmentConfig)
  }
}
