import path from 'path'

export default {
  entry: './modules/main.ts',
  output: {
    filename: 'app.js',
    path: path.resolve('./public')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve('./public'),
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
}
