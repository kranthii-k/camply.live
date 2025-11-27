const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Post = require('./models/Posts')

const app = express()
const port = process.env.PORT

// Middleware      
//bro i dont understand this......
app.use(cors())
app.use(express.json())

app.get('/api/posts', async (req, res) => {
  try {
    // .find() gets everything
    // .sort({ creationTime: -1 }) sorts by newest first (-1 means descending)
    const posts = await Post.find().sort({ createdAt: -1 }) // the order is still ascending even after testing
    
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/posts', async (req, res) => {
    try {
        const { username, trustLevel, comment, category } = req.body
        const newPost = new Post({
            username,
            trustLevel,
            content : comment,
            category
        })
        // Save it to the Database
        const savedPost = await newPost.save()

        // send the saved post back to the user
        res.status(201).json(savedPost)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

// Connect to DB 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Start the server 
        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })


