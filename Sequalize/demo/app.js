const express =require('express');
const db = require('./src/models');
const user_router = require('./src/route/user-router');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
// db.sequelize.sync({force: true});

db.sequelize.sync();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
const port = 3000;

app.get('/',(req,res)=>{
    return res.send('Welcome to demo app');
})

app.use('/api/user',user_router);



app.listen(port||3000,()=>{
   console.log(`Server is listening on port ${port}` );
})

