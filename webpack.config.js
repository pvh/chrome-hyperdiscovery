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
      net: "chrome-net",
      "utp-native": "utp",
      "bittorrent-dht": path.resolve(__dirname, "stubs", "bittorrent-dht"),
    },
    extensions: [".js"],
  },
  module: {
    rules: [
    ],
  },
  plugins: [new CopyWebpackPlugin(["./src/manifest.json", "./src/index.html"])],
}
