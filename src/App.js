import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home/Home'
import routes from './routes'
import VotingTable from "./pages/VotingTable/VotingTable";
import {useEffect} from "react";
import Registration from "./pages/Registration/Registration";
import { setUser } from "./store/slices/UserSlice.js";
import firebase from "./services/firebase"
import {useDispatch, useSelector} from "react-redux";
import HeaderApp from './pages/HeaderApp/HeaderApp'


function App() {
    const dispatch = useDispatch()



    useEffect(()=> {
        console.log("start all")
        firebase.init((value)=>{
            console.log("YEAH", value)
            console.log("*",firebase.currentUser);
            firebase.getCurrenUser(data => {
                console.log("Data", data)
            })



            firebase.auth.onAuthStateChanged(function(user) {
                console.log("user=111", user.uid)
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
    <HeaderApp/>
   <Routes>
     {routes.map((route, ind) => (
         <Route {...route} key={ind}/>
     ))}

   </Routes>
</>
  );
}

export default App;
