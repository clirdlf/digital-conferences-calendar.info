const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  plugins: [
    new miniCssExtractPlugin(), 
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      favicon: './src/favicon.ico'
    })
  ],
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  devServer: {
    static: path.resolve(__dirname, 'docs'),
    port: 8080,
    hot: true
  },
  module: {
    rules: [

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[hash][ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: miniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // loader: 'style-loader'
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('precss'),
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}