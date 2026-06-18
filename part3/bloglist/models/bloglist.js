const mongoose=require('mongoose')

mongoose.set('strictQuery',false)

const url=process.env.MONGODB_URL

mongoose.connect(url)
.then(()=>{
    console.log('Connected to mongodb.');
}).catch((error)=>{
    console("Error connecting to mongodb:",error.message);
})

const blogSchema=mongoose.Schema({
    title:String,
    author:String,
    url:String,
    likes:Number
}
)

module.exports=mongoose.model('Blog',blogSchema);
