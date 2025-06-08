import React, {useState , useRef} from 'react'
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {addUser}  from "../utils/userSlice";
import {USER_AVATAR} from "../utils/constants"
import { BG_URL } from './../utils/constants';


const Login = () => {

  const [issignin, setIsSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  const handleButton = () => {
    const Message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(Message)
    if (Message) return;

    if(!issignin) {
      //SignUp Logic
      createUserWithEmailAndPassword(
        auth, 
        email.current.value,
        password.current.value )
      .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
      displayName: name.current.value,
      photoURL: USER_AVATAR
      }).then(() => {
        const {uid, email,  displayName, photoURL } = auth.currentUser;
        console.log("hello",uid, email,  displayName, photoURL );
        
          dispatch(addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          }))
        navigate("/browse")
      }).catch((error) => {
        navigate("/errorpage")
      });
    })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage)
    });
    } else {
      signInWithEmailAndPassword(
        auth, 
        email.current.value,
        password.current.value)
      .then((userCredential) => {
      const user = userCredential.user;
      console.log("user", user);
      navigate("/browse")
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage)
      });
    }
  }
  const toggleSignInForm = () => {
    setIsSignIn(!issignin)
  }
  return (
    <div>
      <Header/>
      <div  className = "absolute">
        <img 
        src = {BG_URL}
        alt = "background"/>
      </div>
      <div className = " absolute w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70 ">
        <form className = " flex flex-col items-center  py-14" onSubmit = {(e) => e.preventDefault()}>
        <h1 
        className = "text-3xl  font-bold py-3">
          {issignin ? "Sign In" : "Sign Up"}
        </h1>
        {!issignin && (<input 
        ref = {name}
        type = "text" 
        placeholder = "Full Name" 
        className = "p-3 m-2 w-[75%] rounded-sm  bg-gray-500"
        />)}
        <input 
        ref = {email}
        type = "text" 
        placeholder = "Email" 
        className = "p-3 m-2 w-[75%] rounded-sm bg-gray-500 "
        />
        <input 
        ref = {password}
        type = "password" 
        placeholder = "Password" 
        className = "p-3 m-2 w-[75%] rounded-sm bg-gray-500"
        />
        <p className = "text-red-600 font-bold">{errorMessage}</p>
        <button 
        className = "p-1 m-1 bg-red-600 w-[75%] rounded-sm "
        onClick = {handleButton}>
          {issignin ? "Sign In" : "Sign Up"}
        </button>
        <p 
        className = " m-4 cursor-pointer " 
        onClick = {toggleSignInForm}>
          {issignin ? "New to Netflix? Sign Up now" : "Already Registred Sign In Here"}
        </p>
      </form>
      </div>
    </div>
  )
}

export default Login
