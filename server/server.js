const path = require('path')

// Create express server (this is all for Heroku)
const express = require('express')
const app = express()

// Specify where our files are
const publicPath = path.join(__dirname, '..', 'public')

// Heroku doesnt use the 3000 port but instead provides something dynamically, this is how to use their port
const port = process.env.PORT || 3000

// Tell it to serve these static files from our public directory
app.use(express.static(publicPath))

// If what the person requested isn't in the public folder, just give them back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

// Start it up on port 3000
app.listen(port, () => {
    console.log('Server is up')
})