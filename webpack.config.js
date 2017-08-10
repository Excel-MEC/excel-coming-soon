const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractSass = new ExtractTextPlugin({
	filename: "main.css",
});


module.exports = {

	entry: [
		'./js/main.js',
	],

	output: {
		path: path.resolve(__dirname,"dist"),
		filename: "bundle.js",
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: [
							"latest",
							]
						}

				}
			},
			{
            test: /(\.scss$|\.css$)/,
            use: ExtractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: __dirname
		}),		
		new webpack.optimize.UglifyJsPlugin(),
		ExtractSass,		
	    new OptimizeCssAssetsPlugin({
	      assetNameRegExp: /\.css$/g,
	      cssProcessor: require('cssnano'),
	      cssProcessorOptions: { discardComments: {removeAll: true } },
	      canPrint: true
		}),
	]

};