import React, {useEffect, useState, useRef} from 'react'
import './style.scss';
import {Link} from "react-router-dom";
import * as ReactBootstrap from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import svgLogout from './../../media/icons/logout.svg'


// import {Link} from 'react-router-dom'
const Row = ReactBootstrap.Row;
const Card = ReactBootstrap.Card;
const Button = ReactBootstrap.Button;

const FooterApp = () => {
    const activeUser = useSelector(state => state.user)


    return (

            <Card className="text-center footer-app">
           <Card.Header  className='footer-app-text'> <Card.Title >Special For Eurovision fans</Card.Title></Card.Header>
            <Card.Body>

                <Card.Text className={'footer-app-text'}>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                {/*<Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
            <Card.Footer className="text-muted">&copy; Copyright | All rigths are reserved</Card.Footer>
</Card>

    );
}

export default FooterApp;