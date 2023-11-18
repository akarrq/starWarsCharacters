import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
	mode:
		(process.env.NODE_ENV as 'production' | 'development' | undefined) ??
		'development',
	entry: './src/entrypoint.tsx',
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: 'public' }],
		}),
	],
	devServer: {
		historyApiFallback: true,
	},
};

export default config;
