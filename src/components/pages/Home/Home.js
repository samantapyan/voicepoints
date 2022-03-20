import React, {useEffect, useState, useRef} from 'react'
import './style.scss';
import {Link} from "react-router-dom";
import * as ReactBootstrap from 'react-bootstrap'
import RegistrationJury from "./../RegistrationJury/RegistrationJury"
import {useDispatch, useSelector} from "react-redux";
import { Button } from 'react-bootstrap';
import voice from './../../../media/backgrounds/voice.svg'
import host from './../../../media/backgrounds/host.png'
import HeaderApp from "../HeaderApp/HeaderApp";
import firebase from "../../../services/firebase";





// import {Link} from 'react-router-dom'
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Container = ReactBootstrap.Container;
const Home = () => {
    const activeUser = useSelector(state => state.user)
    const [countries, setCountries] = useState([])

useEffect(()=>{
    firebase.getAllCountries((allData)=>{
        setCountries(allData)
        console.log("all Data =",allData);
    })
},[])

    function initAll() {
        let all = countries
        all.map(data => {
            firebase.storeCountryData({...data, points:0, position: {top:0, left:0}},()=>{})
        })
        localStorage.removeItem('juryTimeId')

    }

    return (
        <div className="App">
            <HeaderApp/>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/FO5KlT3ivVs"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            <div className={'home-banner-1'}>
                <Container>
                    <div>
                        <span className={'home-banner-1-main-word font-weight-bold pr-4'}>Voice</span>
                        <span className={'home-banner-1-text'}>points</span>
                    </div>
                    <div className={'text-center'}>
                        <Link to={'registration'} className={'fst-normal text-decoration-none'}>Go To Reg Page </Link>
                    </div>
                </Container>
            </div>
            <div className={'home-banner-add'}>
                <div>
                    {activeUser && activeUser.type === "admin" && (
                        <Button>OFF Registration</Button>
                    )}
                </div>
                <RegistrationJury/>

            </div>

            <div className={'home-banner-3'}>
                <Container>
                    <span className={'home-banner-1-text'}>Be a </span>
                    <span className={'home-banner-1-main-word font-weight-bold pr-4'}> Jury</span>
                    <span className={'home-banner-1-text'}>and give your points</span>
                    <div className={'home-banner-1-register-section'}>
                        {activeUser && activeUser?.email && activeUser.email && (
                         <Link to={'votings'}>Go To Voting Page </Link>
                        )
                        }
                    </div>
                </Container>
            </div>


            <div className={'home-banner-3'}>
                <Container>
                    <span className={'home-banner-1-text'}  > Go to </span>


                        <Link to={'/login'} className={'home-banner-1-main-word no-link font-weight-bold pr-4'}> Admin Login</Link>
                   <div>
                       {activeUser && activeUser?.email && activeUser.email && (
                       <Button className={'mt-4'} onClick={initAll}>Initialization Points</Button>
                   )
                   }
                   </div>



                </Container>
            </div>
            <div className={'home-banner-voice'}>
            </div>
            <div className={'home-banner-2'}>
                <Container>
                    <span className={'home-banner-1-text'}>Watch</span>
                    <span className={'home-banner-1-main-word font-weight-bold pr-4'}> Junior Eurovision song contest 2021</span>
                    <span className={'home-banner-1-text'}></span>
                </Container>
            </div>

        </div>
    );
}

export default Home;