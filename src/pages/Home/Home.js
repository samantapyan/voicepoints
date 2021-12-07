import React, {useEffect, useState, useRef} from 'react'
import './style.scss';
import {Link} from "react-router-dom";
import * as ReactBootstrap from 'react-bootstrap'

// import {Link} from 'react-router-dom'
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Container = ReactBootstrap.Container;
const Home = () => {


    return (
        <div className="App">
            <div className={'home-banner-1'}>
                <Container>
                    <span className={'home-banner-1-main-word font-weight-bold pr-4'}>Voice</span>
                    <span className={'home-banner-1-text'}>points</span>
                </Container>
            </div>
            <div className={'home-banner-3'}>
                <Container>
                    <span className={'home-banner-1-text'}>Be a </span>
                    <span className={'home-banner-1-main-word font-weight-bold pr-4'}> Jury</span>
                    <span className={'home-banner-1-text'}>and give your points</span>
                </Container>
            </div>
            <div className={'home-banner-3'}>
                <Container>
                    <span className={'home-banner-1-text'}  >Go to </span>
                    <Link to={'/votings'} className={'home-banner-1-main-word no-link font-weight-bold pr-4'}> Simulation Page</Link>
                </Container>
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