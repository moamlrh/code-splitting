const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const WebpackBundleAnalyzer =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => {
  console.log(env);
  const config = {
    mode: env.mode,
    entry: path.resolve("src", "index.js"),
    //  {
    // vendors: ["react", "react-dom", "react-router-dom"],
    // main: {
    // import: path.resolve("src", "index.js"),
    // dependOn: "vendors",
    // },
    // app: {
    //   import: path.resolve("src", "App.jsx"),
    //   dependOn: "main",
    // },
    // about: {
    //   import: path.resolve("src", "components", "about.jsx"),
    //   dependOn: "main",
    // },
    // profile: {
    //   import: path.resolve("src", "components", "profile.jsx"),
    //   dependOn: "main",
    // },
    // },
    output: {
      path: path.resolve("build"),
      filename: "[name].js",
      chunkFilename: "[name].chunk.js",
    },
    // [optimization.splitChunks.chunks = 'all'] is a way of saying :
    //  “put everything in node_modules into a file called vendors~main.js".
    optimization: {
      splitChunks: {
        maxSize: 10000,
        cacheGroups: {
          react: {
            // test: /[\\/]node_modules[\\/]/, bundl all modules
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // specific module
            name: "react",
            chunks: "all",
          },
        },
      },
    },
    devServer: {
      contentBase: path.resolve("build"),
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    devtool: false,
    experiments: {
      topLevelAwait: true,
    },
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
          type: "asset",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join("public", "index.html"),
        inject: "body",
      }),
      env.mode === "development" && new WebpackBundleAnalyzer(),
    ].filter(Boolean),
  };

  return config;
};
