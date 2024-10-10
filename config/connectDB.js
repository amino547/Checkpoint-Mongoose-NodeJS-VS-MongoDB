const mongoose=require("mongoose")
const config=require("config")
const connectDB=()=>{
    mongoose.connect(config.get("MONGO_URI"))
    .then(()=>console.log("mongodb connect"))
    .catch((err)=>console.log(err))
}

module.exports=connectDB