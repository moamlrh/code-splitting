const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env) => {
  console.log(env);
  const config = {
    entry: {
      vendors: ["react", "react-dom", "react-router-dom"],
      main: {
        import: path.resolve("src", "index.js"),
        dependOn: "vendors",
      },
      about: {
        import: path.resolve("src", "components", "about.jsx"),
        dependOn: "vendors",
      },
      profile: {
        import: path.resolve("src", "components", "profile.jsx"),
        dependOn: "vendors",
      },
    },
    output: {
      path: path.resolve("build"),
      filename: "js/[name].[chunkhash].js",
      publicPath: "/",
    },
    devServer: {
      contentBase: path.resolve("build"),
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /node_modules/,
          resolve: {
            extensions: [".js", ".jsx"],
          },
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  ["@babel/preset-react", { runtime: "automatic" }],
                ],
                plugins: [
                  "@babel/plugin-transform-runtime",
                  "@babel/plugin-syntax-dynamic-import",
                ],
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join("public", "index.html"),
        inject: "body",
      }),
    ],
  };

  return config;
};
