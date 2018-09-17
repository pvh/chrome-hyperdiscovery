const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const env = process.env.NODE_ENV

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.jsx",
    background: "./src/entry.chrome.js",
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      dgram: "chrome-dgram",
      debug: "chrome-debug",
      net: "chrome-net",
      "utp-native": "utp",
      "bittorrent-dht": path.resolve(__dirname, "stubs", "bittorrent-dht"),
      "random-access-file": path.resolve(__dirname, "stubs", "bittorrent-dht"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CopyWebpackPlugin(["./src/manifest.json", "./src/index.html"])],
}
