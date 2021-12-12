import React, {useEffect, useState, useRef} from 'react'
import './style.scss';
import {Link} from "react-router-dom";
import * as ReactBootstrap from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import svgLogout from './../../media/icons/logout.svg'


// import {Link} from 'react-router-dom'
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Container = ReactBootstrap.Container;

const HeaderApp = () => {
    const activeUser = useSelector(state => state.user)


    return (
        <div className="App">
                <Row className="mr-0 ml-0 justify-content-end" xs={2} md={4} lg={6} >
                    <Col></Col>
                    <Col></Col>
                    <Col className={'text-right mr-3'}>
                        <div>
                            {activeUser?.email || ""}
                        </div>
                           <div className={'d-flex justify-content-end cursor-pointer '}>
                                <div style={{width:'20px', height: "20px"}} className="mr-3"><img src={svgLogout} alt=""/></div>
                                <div>Log out</div>
                           </div>
                    </Col>
                </Row>
        </div>
    );
}

export default HeaderApp;