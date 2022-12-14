const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
       

    },
    GSTIN:{
        type:String
    },
    Email:{
        type:String,
       
    },
    Adress:{
        type:String,
       
    },
    Username:{
        type:String,
     
    },
    Password:{
        type:String,
        
    },
    Type:{
        type:String,
       
    },  
    Cookie:{
        type:String
    }  
    
    

})


/*userSchema.pre('save',async function(next){
    console.log('in middleware')
    console.log(user.password)

    (this.isModified('password')){
      this.password = bcrypt.hash(this.password, 12)
        this.cpassword = bcrypt.hash(this.cpassword,12);
    }
    next();
    
});*/


userSchema.methods.generateAuthToken = async function(){
    try{
      let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        console.log(token)
        this.tokens = this.tokens.concat({token:token})
        console.log(token)
        await this.save()
    return token;
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('USER',userSchema)
module.exports = User
