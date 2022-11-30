import React from 'react'
import jsCookie from  'js-cookie'
function Getdata() {
    const getData = async () => {
        console.log('asdgjas')
        const cookie = jsCookie.get();
        const { loginCookie } = cookie;
        const Cookie = loginCookie;
        const res = await fetch("/getdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Cookie }),
        })
        const data = await res.json()
         console.log(data)
        const {user,account} = data
        const { Adress, name, GSTIN, Email } = user
        const {Transactions} = account;
        console.log(Transactions)
         console.log( 'Adress', Adress)
         console.log( 'GSTIN', GSTIN)
         console.log( 'Email', Email)
        localStorage.setItem('Username',JSON.stringify(name))
        localStorage.setItem('Adress',JSON.stringify(Adress))
        localStorage.setItem('GSTIN',JSON.stringify(GSTIN))
        localStorage.setItem('Email',JSON.stringify(Email))
        localStorage.setItem('Transactions',JSON.stringify(Transactions))
          
        
      };
      return(getData)
}

export default Getdata