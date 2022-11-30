import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settings from "./Settings";
import Invoice from "./Invoice";
import PrintInvoices from "./PrintInvoices";
import Transactions from "./Transactions";
import Signup from "./Signup";
import Login from "./Login";
import GetDetails from "./GetDetails";
import Notificationbox from "./Notificationbox";
import Home from "./Home";
import WorkSpace from "./WorkSpace";
import jsCookie from "js-cookie";
import { useEffect } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import Accounts from "./Accounts";
import { BiPowerOff } from "react-icons/bi";
import CreditAccount from "./CreditAccount";
import Getdata from "./Getdata";

function Content(props) {
  const Navigate = useNavigate();
  const [contentMargin, setcontentMargin] = useState("ml-56");
  const [PromtYes, setPromtYes] = useState("");
  const [PromtNo, setPromtNo] = useState("");

  const [Receiver, setReceiver] = useState("");
  const [ReceiverAdress, setReceiverAdress] = useState("");
  const [ReceiverGSTIN, setReceiverGSTIN] = useState("");
  const [Self, setSelf] = useState("");
  const [SelfAdress, setSelfAdress] = useState("");
  const [SelfGSTIN, setSelfGSTIN] = useState("");
  const [Promt, setPromt] = useState("there is an error");
  const [PromtScale, setPromtScale] = useState("scale-0");

  const changeContentPadding = () => {
    if (contentMargin === "ml-56") {
      console.log("asdas");
      setcontentMargin("ml-20");
    } else {
      console.log("a");
      setcontentMargin("ml-56");
    }
  };

  useEffect(() => {
    console.log("set");

    getData();
  }, []);



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

  const print = () => {
    console.log("inn");
    var printContents = document.getElementById("printDiv");
    if (!printContents) {
      var x = "cannot print on this Page";
      const fun = promt(x);
      if (fun === "yes") {
        print();
      } else {
      }
    } else {
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents.innerHTML;

      window.print();

      document.location.reload();
      document.body.innerHTML = originalContents;
    }
  };

  const promt = async (x) => {
    const aaa = x;
    setPromt(aaa);
    setPromtScale("scale-100");
  };
  const promtClose = () => {
    setPromtScale("scale-0");
  };
  const logout = async () => {
    //  document.cookie = 'logincookie' + ";max-age=0";
    // const log =  await  props.promt()
    // if(log === 'yes'){

    jsCookie.remove("loginCookie");
    localStorage.clear();
    Navigate("/login");
    window.alert("Logged Out");
    window.location.reload();
    // }else{

    // }
  };
  return (
    <>
      <div className="flex   bg-white h-fit  w-full    relative  ">
        <div className="">
          <Navbar promt={promt} />
        </div>
        <div
          className={`bg-transparent absolute w-screen h-screen z-50 grid justify-items-center ${PromtScale} `}
        >
          <div className="absolute h-fit w-3/6 top-24 bg-white shadow-xl rounded-lg p-10 border-2 text-center">
            <div
              className="absolute border-2  right-10 p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                promtClose();
              }}
            >
              X
            </div>
            <div className="text-center font-bold text-2xl  ">MESSAGE</div>
            <br></br>
            <div className="text-lg font-bold ">{`${Promt}`}</div>
            <br></br>
            <div className=" grid col-span-2 gap-5">
              <button
                className="bg-blue-600 text-white pl-5 pr-5 pt-2 pb-2 rounded-lg   hover:bg-blue-700"
                onClick={() => {
                  setPromtYes("yes");
                }}
              >
                OK
              </button>
              <button
                className="border-2 pl-5 pr-5 pt-2 pb-2 rounded-lg  hover:bg-red-500 hover:text-black "
                onClick={() => {
                  setPromtNo("No");
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
        <div
          className={`absolute ml-56  w-5/6 h-screen bg-white/75 blur-lg grid justify-items-center items-center ${PromtScale} `}
        ></div>
        <div className={`  h-screen   bg-inherit `}>
          <div className="absolute z-50  md:w-full  md:h-12  xl:w-12   xl:h-screen bg-slate-800 shadow-sm shadow-black   md:bottom-0  xl:right-0   ">
            <div className="m-2 mt-18  gap-4 md:flex xl:block  h-5/6  justify-items-center">
              <div
                className="   text-center rounded-md cursor-pointer shadow-lg  hover:shadow-2xl  "
                onClick={() => {
                  print();
                }}
              >
                <div>{<AiOutlinePrinter size={40} color={"white"} />}</div>
              </div>
              <div
                className="   text-center rounded-md cursor-pointer shadow-lg  hover:shadow-2xl "
                onClick={() => {
                  logout();
                }}
              >
                <div>{<BiPowerOff size={40} color={"white"} />}</div>
              </div>
            </div>
          </div>
          {/* Main workspace */}
    

          <div className=" bg-white  w-5/6  absolute   ml-2  h-5/6     overflow-auto   ">
            <Routes>
              <Route exact path="/settings" element={<Settings />}></Route>
              <Route exact path="/Account" element={<Accounts />}></Route>
              <Route
                exact
                path="/CreditAccount"
                element={<CreditAccount />}
                ></Route>
              <Route exact path="/invoices" element={<Invoice />}></Route>
              <Route
                exact
                path="Print"
                element={<PrintInvoices print={print} />}
                ></Route>
              <Route
                path="Transactions"
                element={<Transactions print={print} />}
                ></Route>

              <Route path="/" element={<Home />}></Route>
            </Routes>
                </div>
          
        </div>
      </div>
    </>
  );
}

export default Content;
