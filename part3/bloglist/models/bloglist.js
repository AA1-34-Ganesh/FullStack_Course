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
    title:{
        type:String,
        required:true
    },
    author:String,
    url:{
        type:String,
        required:true
    },
   likes: {
    type: Number,
    default: 0
  }
}
)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports=mongoose.model('Blog',blogSchema);
