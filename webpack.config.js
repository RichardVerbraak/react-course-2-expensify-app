// Path is a method that lets you use .join for combining the paths together (to avoid issues)
// We 'teach' webpack to use babel via babel loader and give it rules as to when to use babel
// The module rules basically says to only transpile (convert jsx to regular js with babel) on .js files

// The question mark in scss looks for css AND scss files

// We changed this to export a function instead of an object so we can specify when webpack should run build for development or production
// The devtool source maps are huge in size (the file was 4.13mb) which is okay for development but not production
// We now opt for a 'slower' version of source mapping in production, source-map will only load for the user when you crack open the devTools

// We setup the development and test environment for firebase, so we have two databases, one for testing and the other for real data
// This runs based on the below if statements
// We had to define the process.env plugin below for webpack and we had to stringify them to add double quotes " " around the values when it reads off of it

// babel polyfill allows array methods like .includes to work in other browsers/
// It's setup before webpack goes through app.js

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path: '.env.test'})
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: '.env.development'})
}

module.exports = (env) => {
    const isProduction = env === 'production'
    const CSSExtract = new MiniCssExtractPlugin({filename: 'styles.css'})
    

    return {
        entry: ['babel-polyfill','./src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}