const path = require("path");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const {
    override,
    addBabelPlugin,
    addLessLoader,
    addWebpackModuleRule
} = require("customize-cra");

module.exports = override(
    addBabelPlugin([
        "import",
        { libraryName: "antd", libraryDirectory: "es", style: true },
        "antd"
    ]),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: styleVariables
    }),

    addWebpackModuleRule({
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.(tsx|ts)$/,
        loader: require.resolve("babel-loader"),
        options: {
            presets: [["react-app", { flow: false, typescript: false }]],
            plugins: [["import", { libraryName: "antd", style: true }]]
        }
    })
);
