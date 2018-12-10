const transactions= []



exports.getAddInformation = (req, res, next)=>{
    res.render('add-information')
  // res.sendFile(path.join(__dirname,'views','add-information.html'))
}


exports.postTransaction = (req, res, next)=>{
  console.log(transactions)
  transactions.push({ name: req.body.name, lastname: req.body.lastname})
  res.redirect('/')
}

exports.showTransanctions = (req, res, next)=>{
  res.render('transactions', { trans: transactions, pagetitle: 'Transactions'})
  // console.log(transactions)
  // res.sendFile(path.join(__dirname, 'views' ,'transactions.html'))
}
