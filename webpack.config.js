const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },{
            test: /\.(jpe?g|png|gif|svg)$/i, 
            loader: "file-loader?name=/src/assets/[name].[ext]"
        },{
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        })
      ]

  };