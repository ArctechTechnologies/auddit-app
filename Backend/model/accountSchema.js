const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { type } = require("express/lib/response");
const AccountSchema = new mongoose.Schema({
  Username: {
    type: String,
  },
  Cookie: {
    type: String,
  },
  Cash:[
      {

      }
  ],
  cashInHand:[
    {

    }
  ],
 Debit:[
  {

  }
 ],
 Credit:[
  {

  }
 ],
Invoice:
  { 
invocieNo:{
      type:Number
    },
Credit:{
      type:Number
    },
Debit:{
      type:Number
    }
  }
 ,
Transactions:[
  {

  }
  ],
confirm:[{

}],

Cookie:{
      type:String
    },
Client:
  {
    
    
  }
,
others:{
 
}


});

const Account = mongoose.model("ACCOUNTS", AccountSchema);
module.exports = Account;
