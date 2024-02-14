import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type TMode = "production" | "development";

interface TEnvVariables {
    mode: TMode;
}

const config = (env: TEnvVariables): webpack.Configuration => {
    const isDev = env.mode === "development";

    return {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "build.[contenthash].js",
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
            }),
            ...(isDev ? [new webpack.ProgressPlugin()] : []),
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash].css",
                chunkFilename: "css/[name].[contenthash].css",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.s(a|c)ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: isDev
                                        ? "[path][name]__[local]"
                                        : "[hash:base64:8]",
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    modules: true,
                                    outputStyle: "compressed",
                                },
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".scss"],
        },
        devtool: isDev ? "inline-source-map" : false,
        devServer: isDev
            ? {
                  port: 3000,
                  open: true,
              }
            : undefined,
    };
};

export default config;
