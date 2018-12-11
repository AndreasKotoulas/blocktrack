const Transaction= require('../models/information')

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');


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


const provider= new HDWalletProvider (
  'bubble dose butter unlock company loop shoe eyebrow devote horse kite warrior',
  'https://rinkeby.infura.io/v3/069b7f59b3da45099fc4a42b8ace4c1e'
);

const web3 = new Web3(provider);
const abi=[
  {
    constant: false,
    inputs: [{ name: "newMessage", type: "string" }],
    name: "setMessage",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "message",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "initialMessage", type: "string" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  }
]
const address= '0xff76c742B3d1aA738D80981d8eCB418d1BD150A0'
var smart= new web3.eth.Contract(abi, address)

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

exports.getEditTransaction =(req, res, next)=>{
  const tranID =req.params.transactionID
  InformationModel.findById(tranID, function (err, transaction) {
    //console.log(transaction)
    res.render('edit-information', { transaction: transaction, pagetitle: 'Edit a Transaction'})
  })
}

exports.postEditTransaction = (req, res, next) => {
    const transID= req.body.transactionID
    // const updatedname = req.body.name
    // const updatedlastname = req.body.lastname
    let previous=''
    InformationModel.findById(transID, function (err, transaction) {
        //  console.log(transaction)
        if(err){
          console.log('Error occured')
        }else{
          previous=transaction.txHash
          console.log(previous)
          var personalinformation= new InformationModel(req.body)

          bcrypt.genSalt(saltRounds, function(err, salt)
          {
              bcrypt.hash(req.body.name + req.body.lastname, salt, function(err, hash)
              {
                      if(err){
                        console.log('Error occured')
                      }else{
                        personalinformation.datahash= hash
                        personalinformation.salt=salt
                        personalinformation.previousHash=previous
                        message="The data have been modified. Previous transaction hash: " + previous + " Current Data hash:" + personalinformation.datahash
                        smart.methods.setMessage(message).send({from: '0x1928e1570D98c3f49EdAEB36047616A57A73e9f8'})
                          .then(function(receipt)
                          {
                            console.log(receipt)
                            console.log(receipt.to)
                            console.log(receipt.transactionHash)
                            personalinformation.txHash= receipt.transactionHash

                            personalinformation.save()
                          })
                      }
              });
          });
        }


    })



}

exports.postTransaction = (req, res, next) => {
  var personalinformation= new InformationModel(req.body)

  bcrypt.genSalt(saltRounds, function(err, salt)
  {
      bcrypt.hash(req.body.name + req.body.lastname, salt, function(err, hash)
      {

              personalinformation.datahash= hash
              personalinformation.salt=salt
              personalinformation.previousHash=''
              smart.methods.setMessage(personalinformation.datahash).send({from: '0x1928e1570D98c3f49EdAEB36047616A57A73e9f8'})
                .then(function(receipt)
                {
                  console.log(receipt)
                  console.log(receipt.to)
                  console.log(receipt.transactionHash)
                  personalinformation.txHash= receipt.transactionHash

                  personalinformation.save()
                }

      )});
  });
  // console.log(personalinformation.datahash)
  // console.log(personalinformation.salt)
  // personalinformation.save(
  //   (err)=>{
  //         if(err){
  //           sendStatus(500)
  //         }else{
  //           //personalinformation.push(req.body)
  //           res.sendStatus(200)
  //         }
  //
  //     }
  //   )
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
    // console.log(transactions)
    res.render('transactions', { trans: transactions, pagetitle: 'Transactions'})
    //res.send(transactions)
  })
  // res.render('transactions', { trans: transactions, pagetitle: 'Transactions'})
  // console.log(transactions)
  // res.sendFile(path.join(__dirname, 'views' ,'transactions.html'))
}
