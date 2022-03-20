import React, {useEffect, useState, useRef} from 'react'
import './style.scss';
import {Link} from "react-router-dom";
import * as ReactBootstrap from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import svgLogout from './../../../media/icons/logout.svg'


// import {Link} from 'react-router-dom'
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Container = ReactBootstrap.Container;

const HeaderApp = () => {
    const activeUser = useSelector(state => state.user)


    return (
        <div className="header-app">
                <Row className="header-app-content  mr-0 ml-0 justify-content-end" xs={1} sm={3} md={3} lg={2} >

                    <Col xl={4} lg={4} sm={5} className={'text-right mr-3'}>
                        <div className={'text-end'}>
                            {activeUser?.email || ""}
                        </div>

                        {activeUser?.email && (
                            <div className={'d-flex justify-content-end cursor-pointer '}>
                                <div style={{width:'20px', height: "20px"}} className="mr-3"><img src={svgLogout} alt=""/></div>
                                <div>Log out</div>
                            </div>
                        )}

                    </Col>
                </Row>
        </div>
    );
}

export default HeaderApp;