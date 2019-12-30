var path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  // entry: {
  //   app: ["./src/index.tsx"],

  //   vendor: ["react", "react-dom"]
  // },
  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   publicPath: "/",
  //   filename: "[name].js"
  // },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    inline: false,
    // compress: true,
    historyApiFallback: true
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html"
    })
  ],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};
