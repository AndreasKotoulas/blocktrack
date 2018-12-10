const path = require('path')
const express= require('express')
const bodyParser=require('body-parser')
const app=express();
const transactions= []

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/add-information',(req, res, next)=>{
  console.log(transactions)
  res.sendFile(path.join(__dirname,'views','add-information.html'))
} )

app.post('/information',(req, res, next)=>{
  transactions.push({ name: req.body.name, lastname: req.body.lastname})
  res.redirect('/')
} )

app.use('/',(req, res, next)=>{
  res.render('transactions', { trans: transactions, pagetitle: 'Transactions'})
  // console.log(transactions)
  // res.sendFile(path.join(__dirname, 'views' ,'transactions.html'))
} )



app.listen(3000)
