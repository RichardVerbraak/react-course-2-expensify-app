// Path is a method that lets you use .join for combining the paths together (to avoid issues)
// We 'teach' webpack to use babel via babel loader and give it rules as to when to use babel
// The module rules basically says to only transpile (convert jsx to regular js with babel) on .js files

// The question mark in scss looks for css AND scss files

// We changed this to export a function instead of an object so we can specify when webpack should run build for development or production
// The devtool source maps are huge in size (the file was 4.13mb) which is okay for development but not production
// We now opt for a 'slower' version of source mapping in production, source-map will only load for the user when you crack open the devTools

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    const isProduction = env === 'production'
    const CSSExtract = new MiniCssExtractPlugin({filename: 'styles.css'})
    

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]                
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
}