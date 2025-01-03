// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
   index: "./src/index.js",
   ship: "./src/ship.js",
   gameBoard: "./src/gameBoard.js",
   player: "./src/player.js",
   gameController: "./src/gameController.js",
   renderBoard: "./src/renderBoard.js",
   renderBackground: "./src/renderBackground.js",
   renderUIAttack: "./src/renderUIAttack.js",
   computerBoardPlacement: "./src/computerBoardPlacement.js",
   playerBoardPlacement: "./src/playerBoardPlacement.js",
   soundTrack: "./src/soundtrack.js",
   restartGame: "./src/restartGame.js",
   rulesModal: "./src/rulesModal.js",
   opponentLoadingAnimation: "./src/opponentLoadingAnimation.js",
   gameAlertBanner: "./src/gameAlertBanner.js"
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devtool: "eval-source-map",
  devServer: {
    static: './dist',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: 'Output Management',
    }),
    new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
        },
    },
    ],
  },
 
};
