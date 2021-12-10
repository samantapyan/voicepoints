import { Button, Table } from 'react-bootstrap';
import './style.scss'
import Data from './../../registrationFields'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import firebase from "./../../services/firebase"
import {setUser} from "../../store/slices/UserSlice";
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import {useAuth} from "../../contexts/AuthContext";
// import {AuthProvider} from "./../../contexts/AuthContext";


function Registration() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    console.log("user=", user);
    const fields = Data.fieldsUserSignUp;
    console.log("fields",fields);

    // const {signUp} = useAuth()


    useEffect(()=>{

    },[])



    function compare(a, b) {
        if (
            a.hasOwnProperty("points") &&
            b.hasOwnProperty("points") &&
            a.points > b.points
        ) {
            return -1;
        }
        if (
            a.hasOwnProperty("points") &&
            b.hasOwnProperty("points") &&
            a.points < b.points
        ) {
            return 1;
        }
        return 0;
    }

    useEffect(()=>{

    },[])

async function handleSubmit(){

      const auth = firebase.auth
    console.log("a=",auth);
    let email = "testbtest909@gmail.com"
    let password = "qaz10qaz10"

    firebase.auth.createUserWithEmailAndPassword(email, password).then(r =>{
            console.log("reg ok", r)

        dispatch(setUser({email:r.user.email}))
        }) .catch(e => {
            console.log("err reg = ",e)
        })

}



    return (
        <div className={'reg-main'}>
            <div className={'registration-tab'}>
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login">
                        Login Form
                    </div>
                    <div className="title signup">
                        Signup Form
                    </div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" checked/>
                        <input type="radio" name="slide" id="signup"/>
                        <label htmlFor="signup" className="slide signup">Signup</label>
                        <label htmlFor="login" className="slide login">Login</label>
                        <div className="slider-tab"></div>
                    </div>
<button onClick={handleSubmit}>Test SIGNUP</button>
                    <div className="form-inner">
                        <form className="signup" onSubmit={handleSubmit}>
                            {fields.length && fields.map(field => (
                                <div className="field">
                                    <input type={field.type} placeholder={field.name} required/>
                                </div>
                            ))}
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Signup"/>
                            </div>
                        </form>
                        <form action="#" className="login">
                            {fields.length && fields.map(field => (
                                <div className="field">
                                    <input type={field.type} placeholder={field.name} required/>
                                </div>
                            ))}


                            <div className="pass-link">
                                <a href="#">Forgot password?</a>
                            </div>
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Login"/>
                            </div>
                            <div className="signup-link">
                                Not a member? <a href="">Signup now</a>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        </div>


    );
}

export default Registration;
