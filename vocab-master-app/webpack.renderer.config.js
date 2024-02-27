const rules = require("./webpack.rules");
const path = require("path");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      "#config": path.resolve(__dirname, "src/config/index.js"),
      "#hooks": path.resolve(__dirname, "src/hooks/"),
      "#gameUtils": path.resolve(__dirname, "src/utils/game.js"),
      "#storageUtils": path.resolve(__dirname, "src/utils/storage.js"),
      "#arrayUtils": path.resolve(__dirname, "src/utils/array.js"),
      "#views": path.resolve(__dirname, "src/views/index.js"),
      "#gameSlice": path.resolve(__dirname, "src/store/slices/gameSlice.js"),
      "#boardSlice": path.resolve(__dirname, "src/store/slices/boardSlice.js"),
      "#userSlice": path.resolve(__dirname, "src/store/slices/userSlice.js"),
      "#appSlice": path.resolve(__dirname, "src/store/slices/appSlice.js"),
      "#slices": path.resolve(__dirname, "src/store/slices/"),
      "#stores": path.resolve(__dirname, "src/store/slices/index.js"),
      "#routes": path.resolve(__dirname, "src/router/routes.js"),
      "#utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  // plugins: [
  //   new NodePolyfillPlugin()
  // ]
  // resolve: {
  //   fallback: {
  //     "fs": false,
  //     "tls": false,
  //     "net": false,
  //     "path": false
  //   }

  // }
};
