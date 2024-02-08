import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type TMode = "production" | "development";

interface TEnvVariables {
    mode: TMode;
}

const config = (env: TEnvVariables): webpack.Configuration => {
    const isDev = env.mode === "development";

    return {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, "src", "index.ts"),
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
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
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
