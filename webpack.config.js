const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const WebpackBundleAnalyzer =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = (env) => {
  const mode = env.mode;
  const isDev = mode === "development";
  const isProd = mode === "production";

  const config = {
    mode: mode,
    entry: path.resolve("src", "index.js"),
    output: {
      path: path.resolve("build"),
      filename: "[name].js",
      chunkFilename: "[name].chunk.js",
    },
    // [optimization.splitChunks.chunks = 'all'] is a way of saying :
    //  “put everything in node_modules into a file called vendors~main.js".
    optimization: {
      runtimeChunk: "single",
      minimize: true,
      minimizer: [new TerserPlugin({ test: /\.js(\?.*)?$/i })],
      splitChunks: {
        // maxSize: 100000, // in beytes
        cacheGroups: {
          default: {
            minChunks: 3,
            reuseExistingChunk: true,
          },
          react: {
            // test: /[\\/]node_modules[\\/]/, bundl all modules
            test: /[\\/]node_modules[\\/](react)[\\/]/, // specific module
            name: "vendor-react",
            chunks: "initial",
            enforce: true,
          },

          reactDom: {
            // test: /[\\/]node_modules[\\/]/, bundl all modules
            test: /[\\/]node_modules[\\/](react-dom)[\\/]/, // specific module
            name: "vendor-react-dom",
            chunks: "initial",
            enforce: true,
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
    devtool: isDev ? "inline-source-map" : false,
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
      new CleanPlugin.CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join("public", "index.html"),
        inject: "body",
      }),
      isDev && new WebpackBundleAnalyzer(),
      isProd && new CompressionPlugin(),
    ].filter(Boolean),
  };

  return config;
};
