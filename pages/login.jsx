/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";

import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { firebaseApp } from "../firebase-config";

const login = () => {
  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider()
  
  const router = useRouter()

  const signIn = async () => {
    const {user} = await signInWithPopup(firebaseAuth, provider)
    const {refreshToken, providerData} = user
    
    localStorage.setItem('user', JSON.stringify(providerData))
    localStorage.setItem('accessToken', JSON.stringify(refreshToken))

    router.push("/")
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative">
      <img
        className="absolute top-0 left-0 w-screen h-screen object-cover"
        src="/img/bkg.jpg"
        alt="bkg"
      />

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"></div>

      <div className="z-10 flex justify-center items-center border border-gray-300 rounded-full p-2 bg-white bg-opacity-60 cursor-pointer hover:shadow-md hover:bg-opacity-100 duration-150 ease-in-out"
      onClick={signIn}
      >
        <FcGoogle fontSize={30} />
        <p className="text-lg font-semibold ml-4">Login com Google</p>
      </div>
    </div>
  );
};

export default login;
