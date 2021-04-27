const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const {MONGOURI} = require('./config/key')
const items = require('./routes/api/items')
const path = require('path')

const app = express();

//Body Parser
app.use(bodyParser.json());



//connect to mongo
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

//use routes
app.use('/api/items',items)

//serve static assets if in production
if(process.env.NODE_ENV ==='production'){
//set static folder
app.use(express.static('frontend/build'));

app.get('*', (req,res)=>{
   res.sendFile(path.resolve(__dirname,'frontend', 'build','index.html'))
})
}

const port = process.env.PORT || 5000

app.listen(port,() => console.log('server run started on port 5000'))