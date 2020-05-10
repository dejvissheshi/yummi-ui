const path = require("path");
module.exports = {
    module: {
        rules: [
            {
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [["react-app", { flow: false, typescript: false }]],
                    plugins: [["import", { libraryName: "antd", style: true }]]
                }
            },
            {
                test: /\.less$/,
                loaders: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",

                        options: {
                            javascriptEnabled: true
                        }
                    }
                ],
                include: path.resolve(__dirname, "../")
            },
            {
                test: /\.svg$/,
                use: ["url-loader"]
            }
        ],
        resolve:{
            alias:{
                Images: path.relative(__dirname,'src/assets/images')
            }
        }
    }
};
