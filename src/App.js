import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home/Home'
import routes from './routes'
import VotingTable from "./pages/VotingTable/VotingTable";
import Registration from "./pages/Registration/Registration";
import { setUser } from "./store/slices/UserSlice.js";
import firebase from "./services/firebase"
import {useDispatch, useSelector} from "react-redux";
// import HeaderApp from './pages/HeaderApp/HeaderApp'
import FooterApp from './pages/FooterApp/FooterApp'

import React, {useEffect, useState} from 'react'

function App() {
    const dispatch = useDispatch()
    const [isReady, setReady] = useState(false);



    useEffect(()=> {
        console.log("start all")
        firebase.init((value)=>{
            console.log("YEAH", value)
            setReady(true)
            console.log("*",firebase.currentUser);
            firebase.getCurrenUser(data => {
                console.log("Data", data)
            })



            firebase.auth.onAuthStateChanged(function(user) {
                if (user) {
                    dispatch(setUser(
                        {
                            email:user.email ,
                            uid: user.uid
                        }))
                } else {


                }
            });
            if (firebase.currentUser) {
                console.log("*",firebase.auth.currentUser);
                dispatch(setUser(
                    {
                        email:firebase.auth.currentUser.email,
                        uid:firebase.auth.currentUser.email
                    }))
            }

setTimeout(()=>{
    test()
},500)

        })
    },[])



    
    function test() {
        firebase.getCurrenUser(data => {
            console.log("Data", data)
        })
    }
    
  return (
<>
    {isReady && (
        <>

            <Routes>
                {routes.map((route, ind) => (
                    <Route {...route} key={ind}/>
                ))}

            </Routes>
            <FooterApp/>
        </>
    )}

</>
  );
}

export default App;
