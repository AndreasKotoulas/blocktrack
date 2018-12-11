const Transaction= require('../models/information')

var mongoose=require('mongoose')
var dbUrl='mongodb://admin:1234ak@ds115854.mlab.com:15854/smartcontractconnector'

mongoose.connect(dbUrl, { useNewUrlParser: true },(err)=>{
  console.log("Database connection established")
})

var InformationModel= mongoose.model('InformationModel',{
  name:String,
  lastname:String,
  datahash: String,
  txHash:String,
  previousHash: String,
  salt: String
})

exports.getAddInformation = (req, res, next) => {
    res.render('add-information')
  // res.sendFile(path.join(__dirname,'views','add-information.html'))
}

exports.getTransaction= (req,res,next)=>{
   const tranID =req.params.transactionID
   InformationModel.findById(tranID, function (err, transaction) {
     console.log(transaction)
     res.render('transactions-info', { transaction: transaction, pagetitle: 'Specific Transaction'})
   })
   console.log(tranID)

}

exports.editTransaction =(req, res, next)=>{
  const tranID =req.params.transactionID
  InformationModel.findById(tranID, function (err, transaction) {
    console.log(transaction)
    res.render('edit-information', { transaction: transaction, pagetitle: 'Edit a Transaction'})
  })
}

exports.postEditTransaction = (req, res, next) => {
    const transID= req.body.transactionID
    const updatedname = req.body.name
    const updatedlastname = req.body.lastname

    InformationModel.findById(transID, function (err, transaction) {
      console.log(transaction)
       transaction.name=updatedname
       transaction.lastname=updatedlastname
       transaction.save()
    })
    
}

exports.postTransaction = (req, res, next) => {
  var personalinformation= new InformationModel(req.body)
  personalinformation.save(
    // (err)=>{
    //       if(err){
    //         sendStatus(500)
    //       }else{
    //         //personalinformation.push(req.body)
    //         res.sendStatus(200)
    //       }
    //
    //   }
    )
  // personalinformation.datahash=sha256(req.body.name+req.body.lastname)
  // const transaction = new Transaction(req.body.name, req.body.lastname)
  // transaction.save()
  // console.log(transaction)
  res.redirect('/')
}

exports.showTransanctions = (req, res, next)=>{
  // const transactions = Transaction.fetchAll()
  // console.log(transactions)
  InformationModel.find({},(err, transactions)=>{
    //console.log(transactions)
    res.render('transactions', { trans: transactions, pagetitle: 'Transactions'})
    //res.send(transactions)
  })
  // res.render('transactions', { trans: transactions, pagetitle: 'Transactions'})
  // console.log(transactions)
  // res.sendFile(path.join(__dirname, 'views' ,'transactions.html'))
}
