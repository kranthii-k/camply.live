const mongoose = require ('mongoose')

const PostSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique : true
    },
    trustLevel:{
        type:String,
        enum:["bronze","silver","gold","platinum"], // specific badges set in the Feed.tsx file
        required:true
    },
    content: {
        type : String,
        required : true
    },
    upvotes : {
        type : Number,
        required : true,
        default : 0
    },
    downvotes : {
        type : Number,
        required : true,
        default : 0
    },
    comments : {
        type : String,
        required : true,
        default : 0
    },
    category : {
        type: String,
        enum : ["query","solution","job","discussion"], // specific types set in the Feed.tsx file 
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now // This automatically sets the time when created!
    }
})


module.exports = mongoose.model('Post', PostSchema)