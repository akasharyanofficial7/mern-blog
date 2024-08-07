import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import { useRef } from "react";
import DashUsers from "../components/DashUsers";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabFormsUrl = urlParams.get("tab");

    if (tabFormsUrl) {
      setTab(tabFormsUrl);
    }
  }, [window.location.search]);

  return (
    <div className="min-h-screen  flex flex-col md:flex-row">
      <div className=" md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPost />}
      {tab === "users" && <DashUsers />}
    </div>
  );
};

export default Dashboard;
