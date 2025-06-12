
import React, { useState, useRef } from 'react';
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR, BG_URL } from "../utils/constants";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
const Login = () => {
  const [issignin, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButton = async () => {
    setIsLoading(true);
    const Message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(Message);
    if (Message) {
      setIsLoading(false);
      return;
    }

    try {
      if (!issignin) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_AVATAR
        });
        const { uid, email: userEmail, displayName, photoURL } = auth.currentUser;
        dispatch(addUser({
          uid: uid,
          email: userEmail,
          displayName: displayName,
          photoURL: photoURL
        }));
        navigate("/browse");
      } else {
        // Sign In Logic
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        navigate("/browse");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!issignin);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />
      
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        <img 
          src={BG_URL}
          alt="Netflix Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent"></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-400/40 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <div className="w-full max-w-md transform transition-all duration-500 hover:scale-105">
          {/* Glass morphism card */}
          <div className="bg-black/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl"></div>
            
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-transparent rounded-3xl blur-xl opacity-50"></div>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 relative z-10">
              {/* Animated Header */}
              <div className="text-center mb-8">
                <div className="inline-block">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-red-200 bg-clip-text text-transparent mb-2 transform transition-all duration-700">
                    {issignin ? "Welcome Back" : "Join Netflix"}
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full transform transition-all duration-500 ease-out"></div>
                </div>
                <p className="text-gray-400 text-sm mt-3 opacity-0 animate-fade-in">
                  {issignin ? "Sign in to continue watching" : "Create your account to get started"}
                </p>
              </div>

              {/* Name Field with smooth entrance animation */}
              <div className={`transition-all duration-500 ease-out transform ${
                !issignin 
                  ? 'max-h-20 opacity-100 translate-y-0' 
                  : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
              }`}>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-red-400 transition-all duration-300 group-focus-within:scale-110" />
                  </div>
                  <input 
                    ref={name}
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full pl-14 pr-4 py-4 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:bg-gray-800/80 hover:border-gray-500 focus:bg-gray-800/90"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-red-400 transition-all duration-300 group-focus-within:scale-110" />
                </div>
                <input 
                  ref={email}
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full pl-14 pr-4 py-4 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:bg-gray-800/80 hover:border-gray-500 focus:bg-gray-800/90"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-400 transition-all duration-300 group-focus-within:scale-110" />
                </div>
                <input 
                  ref={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" 
                  className="w-full pl-14 pr-14 py-4 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:bg-gray-800/80 hover:border-gray-500 focus:bg-gray-800/90"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-all duration-300 p-1 hover:scale-110 z-10"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Error Message with slide animation */}
              <div className={`transition-all duration-300 ease-out overflow-hidden ${
                errorMessage ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {errorMessage && (
                  <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button with advanced animation */}
              <button 
                className="relative w-full bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:via-red-600 hover:to-red-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-red-500/30 overflow-hidden group"
                onClick={handleButton}
                disabled={isLoading}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                
                {/* Loading spinner overlay */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-600/90 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-white font-medium">Loading...</span>
                    </div>
                  </div>
                )}
                
                <span className={`relative z-10 transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  {issignin ? "Sign In" : "Sign Up"}
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>
                </div>
                <span className="relative bg-black/85 px-6 text-gray-400 text-sm">or</span>
              </div>

              {/* Toggle Sign In/Up */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  {issignin ? "New to Netflix? " : "Already have an account? "}
                  <button 
                    type="button"
                    className="text-red-400 hover:text-red-300 transition-all duration-300 font-medium hover:underline transform hover:scale-105 inline-block" 
                    onClick={toggleSignInForm}
                  >
                    {issignin ? "Sign up now" : "Sign in here"}
                  </button>
                </p>
              </div>

              {/* Forgot Password Link */}
              {issignin && (
                <div className="text-center opacity-0 animate-fade-in">
                  <button className="text-gray-400 hover:text-gray-300 text-sm transition-all duration-300 hover:underline transform hover:scale-105">
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <p className="text-gray-500 text-xs">
              By continuing, you agree to Netflix's Terms of Use and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};


export default Login;