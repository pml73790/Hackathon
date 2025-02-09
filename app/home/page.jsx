"use client";
import LoggedIn from "@/components/home/LoggedIn";
import UserInfo from "@/components/UserInfo";
import { useState } from "react";


export default function Transaction() {
  const [showHomePage, setShowHomePage] = useState(false);

  const dashboardStyle = {
   // backgroundImage: "url('/DecorImage/mountains.webp')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", 
  };
  
  return (
    <div style={dashboardStyle}>
      {showHomePage ? <LoggedIn /> : <UserInfo onStudyClick={() => setShowHomePage(true)} />}
    </div>
  );
}
