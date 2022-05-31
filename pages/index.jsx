import React, { useEffect, useState } from "react";
import { userAccessToken, fetchUser } from "../utils/fetchUserDetails";
import { useRouter } from "next/router";

import { IoLogOut } from "react-icons/io5"
const index = () => {
  
  const router = useRouter();
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {

      const accessToken = userAccessToken();
      // console.log(accessToken);
      if (!accessToken){
        const response = await router.push('/login');
      }else{

        const [userInfo] = fetchUser()
        setUser(userInfo);
      }
      
    }
    const result = fetchData();
  }, []);
  
  const signOut = () => {
    localStorage.clear()
    router.push('/login')
  }
  return (
    <div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-1/3 h-auto p-4 bg_white shadow-md justify-start items-center relative flex">
        <IoLogOut fontSize={25} 
          className="absolute top-3 right-3 cursor-pointer text-gray-600"
          onClick={signOut}
        />
        <img src={user?.photoURL} alt="" 
          className="rounded-md shadow-md "
        />
        <p className="text-2xl font-sans font-semibold ml-2">
          {user?.displayName}
          <span className="block text-xs font-serif font-normal">
          {user?.email}
          </span>

        </p>
      </div>
    </div>
  );
};

export default index;
