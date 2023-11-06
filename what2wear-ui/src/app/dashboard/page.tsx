"use client";

import { AuthStore } from "@/stores/auth";
import { getUserInfo } from "@/utils/aws";
import { useEffect } from "react";

export default function Dashboard() {
  const accessToken = AuthStore((state) => state.accessToken);
  const userInfo = AuthStore((state) => state.user);

  useEffect(() => {
if (!userInfo){
  getUserInfo(accessToken)
} else {
  console.log('user info?')
}
  },[accessToken, userInfo]);
    
  //   async function fetchData() {

  //   }
  //   useEffect(() => {
  //     if (groceryStoreData) {
  //       if (isGroceryStoreDataEmpty(groceryStoreData)) {
  //         console.log("Grocery Store Data not found!");
  //         fetchData();
  //       } else {
  //         console.log("Using Cache");
  //       }
  //     }
  //   }, [groceryStoreData]);

  return (
  <>
    <h1>
      Dashboard!
      
    </h1>
    <p>Welcome  {userInfo.username}!</p>
    <p> My Email:{userInfo.email}!</p>
  </>
  );
}
