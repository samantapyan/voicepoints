import { Button } from 'react-bootstrap';
import Data from './../../../Fields'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import firebase from "./../../../services/firebase"
import {setUser} from "../../../store/slices/UserSlice";
import {useForm} from 'react-hook-form';
import Modal from './../../../components/layouts/Modal/Modal.js'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate , useParams, Link } from 'react-router-dom'


function Registration(props) {
    const navigate = useNavigate();
    console.log("route =",props.match);
    const emailRegexp  ='(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'
let schema = null
    console.log("pathName=", window.location.pathname);
    if (window.location.pathname.includes( "registration")) {
       schema = yup.object().shape({
           firstName: yup.string().required(),
           password: yup.string().required(),
           passwordAgain: yup.string().required(),
           email: yup.string().required().matches(emailRegexp, "Invalid Email"),
           lastName: yup.string().required(),
           country: yup.string().required()
       })
   } else {
       schema = yup.object().shape({
           password: yup.string().required(),
           email: yup.string().required().matches(emailRegexp, "Invalid Email")
       })
   }


    const { register,resetField, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)});

    const [userLocal, setUserLocal]=useState(null)
    const [passwordMatching, setPasswordMatching]=useState({message: '', isError:false})
    const [pageType, setPageType] = useState('')
    const [fields, setFields] = useState([])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const dispatch = useDispatch()
    const activeUser = useSelector(state => state.user)


    useEffect(()=>{
      if (window.location.pathname === "/registration") {
          setPageType("registration")
          let fieldsSignup = Data.fieldsUserSignUp;

          setFields(fieldsSignup)
      } else {
          setPageType("login")
          let fieldsLogin = Data.fieldsUserLogin;
          setFields(fieldsLogin)

      }
      reset()
    },[pageType])



    const onSubmit = data => {
        const {email, password} = data
        if (pageType === "registration") {
            if (data.password !== data.passwordAgain) {
                console.log("match error #1")
                setPasswordMatching({message:"Password does not match",isError:true})
                return false
            }

            setPasswordMatching({message:"",isError:false})
            console.log("data==",data);

            firebase.auth.createUserWithEmailAndPassword(email, password).then(r =>{
                console.log("reg ok all=", r)
                console.log("reg ok uid=", r.user.uid)
                dispatch(setUser({email:r.user.email}))
                setIsModalOpened(true)
                firebase.addUser({email:r.user.email, uid:r.user.uid,type:"user", ...data},r => {
                    console.log("user added successfuly",r)
                    setTimeout(() => {
                        navigate("/")
                    }, 200)
                })
                firebase.auth.signInWithEmailAndPassword(email, password).then(data =>{
                    console.log("Sign In work", data)
                }).catch(error => {
                    console.log("error", error)
                })

            }) .catch(e => {
                console.log("err reg = ",e.message)
                setPasswordMatching({message:e.message,isError:true})
            })

        } else {
            firebase.auth.signInWithEmailAndPassword(email, password).then(r =>{

                dispatch(setUser({email:r.user.email, uid:r.user.uid }))
                navigate('/')

            }) .catch(e => {
                console.log("err reg = ",e.message)
                setPasswordMatching({message:e.message,isError:true})
            })
        }
        fields.forEach(field => {
            resetField(field.key)
        });
        setUser(null)

    };


    return (
        <>
            <div className={'reg-main '}>
                <div className={'registration-tab scroll-Main'}>
                    <div className="wrapper">
                        <div className="title-text">
                            <div className="title login">
                                {pageType === "registration" ? "Registration Form" : "Login Form"}
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-inner">
                                <form className="signup" onSubmit={handleSubmit(onSubmit)}>
                                    {fields.length && fields.map((f, index) => (
                                        <div className="field" key={index}>
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

                                            {pageType === "registration" ? "Register" : "Login"}

                                        </Button>
                                    </div>
                                    {pageType === "login" && (
                                        <Link className="m-3 d-block" to={'/registration'} onClick={e => setPageType('registration')}> Go to Registration </Link>

                                    )}
                                    {pageType === "registration" && (
                                        <Link className="m-3 d-block" to={'/login'} onClick={e => setPageType('login')}> Already have account ? Go to Login  </Link>

                                    )}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                message={"Registration has been successfully !"}
                title={'Alert'}
                messageTitle={'Message'}
                show={isModalOpened}
                onHide={e => setIsModalOpened(false)}
            />
        </>
    );
}

export default Registration;
