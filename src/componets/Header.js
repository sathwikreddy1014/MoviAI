import React, {useEffect}from 'react'
import { useDispatch , useSelector } from "react-redux";
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate, useLocation } from 'react-router-dom'
import {addUser, removeUser}  from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGAGES } from "../utils/constants"
import { toggleGptSearchView } from "../utils/gptSlice"
import { changeLanguage } from "../utils/configSlice"


const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((store) => store.user)
  const showConfig = useSelector((store) => store.gpt.showgptsearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate('/errorpage')
      })
  }

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  }
  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email,  displayName, photoURL } = user;
          dispatch(addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          }))
          navigate("/browse")
        } else {
          dispatch(removeUser())
          navigate("/")
        }
      });
    } , [])

  return (
    <div className="fixed bg-gradient-to-b from-black/80 to-transparent z-30 w-screen flex justify-between items-center px-6 py-4">
      <div>
        <img
          className="w-48"
          src={LOGO}
          alt="logo"
        />
      </div>

      {/* ✅ Show only on /browse */}
      {user && location.pathname === '/browse' && (
        <div className="p-2 m-2 flex gap-3">
          {showConfig && <select className = "bg-gray-600 m-3 p-3 my-2" onChange = {handleLanguage}>
            {SUPPORTED_LANGAGES.map((language) => (
              <option key = {language.identifier} value = {language.identifier}>
              {language.name}</option>
              )) }
          </select>}
          <button className = "bg-violet-700 m-3 p-3 rounded-lg my-2"
          onClick = {handleGptSearchClick}> {showConfig ? "Home Page" : "GPT Search"}</button>
          <img
            className="w-16 h-16 "
            alt="user-logo"
            src="https://occ-0-4857-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTMiZwRhh5FJfP3aZxAPx3Um3gL-gt38U0Txelj-JIiLvU-9M9i4rjnFRNbpUgCFkZxk_60QwarCVVgnUbHMyp66r7h6dWE.png?r=a82"
          />
          <button
            className="cursor-pointer font-bold p-2 m-2"
            onClick={handleSignOut}
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
