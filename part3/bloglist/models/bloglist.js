const mongoose=require('mongoose')

mongoose.set('strictQuery',false)

const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI)
.then(()=>{
    console.log('Connected to mongodb.');
}).catch((error)=>{
    console.log("Error connecting to mongodb:",error.message);
})

const blogSchema=mongoose.Schema({
    title:String,
    author:String,
    url:String,
    likes:Number
}
)

module.exports=mongoose.model('Blog',blogSchema);
