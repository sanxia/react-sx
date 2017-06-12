var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    "react-sx":'./lib/index',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }, 
      __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      minimize: true
    })
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      include: path.resolve(__dirname, './lib'),
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options:{
          presets:['es2015','react','stage-2']
        }
      }
    },{
      test: /\.css$/,
      use: [{
          loader: "style-loader"
        },{
          loader: "css-loader",
          options: {
            modules: true
          }
      }]
    }]
  }
};
