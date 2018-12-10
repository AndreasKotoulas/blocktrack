const path = require('path')
const express= require('express')
const bodyParser=require('body-parser')
const app=express();
const informationController = require('./controllers/information.js');



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/add-information', informationController.getAddInformation )

app.post('/information',informationController.postTransaction)

app.use('/',informationController.showTransanctions )



app.listen(3000)
