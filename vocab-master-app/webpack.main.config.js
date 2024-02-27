const path = require("path");
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main.js",
  // Put your normal webpack config below here

  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, "src/config/index.js"),
      arrayUtils: path.resolve(__dirname, "src/utils/array.js"),
      "#storageUtils": path.resolve(__dirname, "src/utils/storage.js"),
      verbs: path.resolve(__dirname, "src/backend/data/games/verbs.json"),
      pathUtils: path.resolve(__dirname, "src/backend/utils/pathUtils.js"),
      dbModule: path.resolve(__dirname, "src/backend/db/db.js"),
      "#http": path.resolve(__dirname, "src/backend/services/index.js"),
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", "xlsx"],
  },
};
