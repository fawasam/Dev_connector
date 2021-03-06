const mongoose =require('mongoose')
const config =require('config')

const db =config.get('mongoURI')

const connectDB =async()=>{
    try {
        await mongoose.connect(db, {useNewUrlParser:true , useUnifiedTopology:true , useCreateIndex:true ,useFindAndModify:false})
        console.log('connected db');
    } catch (error) {
        console.log(error)
    }
}

module.exports =connectDB;