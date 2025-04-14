const mongoose = require('mongoose')
async function connectDB(){
    try{
await mongoose.connect(process.env.MONGODB_URL)
  const connection = mongoose.connection
  connection.on('connected', ()=>{
    console.log("Connect to DB")
  }) 
connection.on('error', (error)=>{
    console.log("Somethings is wrong in mongodb ", error)
})

}catch (err){
        console.log("Something is wrong " + err)
    }
}

module.exports = connectDB