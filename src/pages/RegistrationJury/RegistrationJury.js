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

// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import {useAuth} from "../../contexts/AuthContext";
// import {AuthProvider} from "./../../contexts/AuthContext";


function RegistrationJury(props) {
    const routeId  = useParams();
    let schema = null
    schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required()
    })



    const { register,resetField, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)});

    const [userLocal, setUserLocal]=useState(null)
    const [passwordMatching, setPasswordMatching]=useState({message: '', isError:false})
const [pageType, setPageType] = useState('')
    const [fields, setFields] = useState([])
    const [isRegisterJury, setIsRegisterJury] = useState(false)
    const dispatch = useDispatch()
    const activeUser = useSelector(state => state.user)


    useEffect(()=>{

        let fieldsJury = Data.fieldsJury;

        setFields(fieldsJury)




        reset()
    },[])







    const onSubmit = data => {
        console.log("SUBMIT +++")
        const {firstName, lastName} = data

        console.log("jury data",data);
let time = new Date().getTime()
firebase.addJury({...data, time}, () => {
    setIsRegisterJury(true)
})
        // firebase.auth.createUserWithEmailAndPassword(email, password).then(r =>{
            //     console.log("reg ok all=", r)
            //     console.log("reg ok uid=", r.user.uid)
            //
            //     dispatch(setUser({email:r.user.email}))
            //     firebase.addUser({email:r.user.email, uid:r.user.uid,...data},r => {
            //         console.log("user added successfuly",r)
            //     })
            //     firebase.auth.signInWithEmailAndPassword(email, password).then(data =>{
            //         console.log("Sign In work", data)
            //     }).catch(error => {
            //         console.log("error", error)
            //     })
            //
            // }) .catch(e => {
            //     console.log("err reg = ",e.message)
            //     setPasswordMatching({message:e.message,isError:true})
            // })



        fields.forEach(field => {
            resetField(field.key)
        });
        setUser(null)

    };


    return (
        <div className={'reg-main'}>
            <div className={'registration-tab'}>
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login">
                        Jury Registration
                    </div>

                </div>
                <div className="form-container">
                    <div className="form-inner">

                        {isRegisterJury === false ? (
                            <form className="signup" onSubmit={handleSubmit(onSubmit)}>
                                {fields.length && fields.map(f => (
                                    <div className="field">
                                        <label htmlFor={f.key}>{f.name}</label>
                                        <input
                                            {...register(f.key,
                                                { required: true, maxLength: 20 }
                                            )}
                                            name={f.key}
                                            type={f.type}
                                            id={f.key}
                                            className={'input w-100'}/>
                                        <div className={'text-danger'}>
                                            {errors[f.key]?.message}
                                        </div>
                                    </div>
                                ))}
                                <div className={'text-danger'}>
                                    {passwordMatching && passwordMatching?.isError && passwordMatching.isError === true && passwordMatching.message}
                                </div>

                                <div className={'mt-4'}>
                                    <Button  type={'submit'} >
                                        Register
                                    </Button>

                                </div>

                            </form>
                        ): <div className={'success-message'}>
                            Registration has been successfuly!
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default RegistrationJury;
