const express = require('express');
const database = require('./src/database/db.config.js');
require('dotenv').config(); 
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
database.mongoose.connect(database.url,{
useNewUrlParser: true,
useUnifiedTopology:true

}
).then(()=>{
    console.log('Vous etes connecté');

})
.catch(err => {
    console.log(err);
});
app.get('/',(req,res)=>{
    res.send({message: 'Hello, Word!'});
})
require('./src/api/routes/routes')(app);

app.listen(process.env.PORT, ()=>{
    console.log('listening on port', process.env.PORT);
});