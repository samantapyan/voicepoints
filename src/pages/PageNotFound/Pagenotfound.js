import { Button, Table } from 'react-bootstrap';
import './style.scss'
import Data from './../../registrationFields'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import firebase from "./../../services/firebase"
import {setUser} from "../../store/slices/UserSlice";
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory, useParams } from 'react-router-dom'



function Pagenotfound(props) {

    return (
        <div className={''}>
            Page not found
        </div>
    );
}

export default Pagenotfound;
