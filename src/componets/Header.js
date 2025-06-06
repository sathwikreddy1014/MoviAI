import React, {useEffect}from 'react'
import { useDispatch , useSelector } from "react-redux";
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate, useLocation } from 'react-router-dom'
import {addUser, removeUser}  from "../utils/userSlice";
import { LOGO } from "../utils/constants"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate('/errorpage')
      })
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
    <div className="absolute bg-gradient-to-b from-black z-20 w-screen flex justify-between">
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
          <img
            className="w-16 "
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
