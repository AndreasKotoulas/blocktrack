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

app.get('/transactions/:transactionID', informationController.getTransaction)

app.get('/edit-information/:transactionID', informationController.getEditTransaction)

app.post('/information',informationController.postTransaction)

app.post('/edit-information',informationController.postEditTransaction)

app.use('/',informationController.showTransanctions )



var server=app.listen(3000, ()=>{
  console.log('Server is listening on port:', server.address().port)
})
