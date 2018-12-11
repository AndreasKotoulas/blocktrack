const information= []

module.exports= class Information {
  constructor(name, lastname){
    this.name=name
    this.lastname=lastname
  }
  save(){
    information.push(this)
  }

  static fetchAll(){
    return information
  }
}
