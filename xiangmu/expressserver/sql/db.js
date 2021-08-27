 

const mongoose = require('mongoose')

//   mongoose.connect('mongodb://localhost:27017/gz')
mongoose.connect('mongodb+srv://zlc007:654321QWER@cluster0.hm4nf.mongodb.net/a2012?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true } )

mongoose.connection.on('connected',()=>{
    console.log('我是mongodb 数据库 我连接了 连接成功!!!!!!!!!!!!!!!!!!!!!!!')
})

mongoose.connection.on('disconected',()=>{
    console.log('disconected  数据库连接 断开')
})

mongoose.connection.on('error',()=>{
    console.log('mongoose error')
})



module.exports.mongoose = mongoose

 
