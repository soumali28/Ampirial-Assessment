import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "./Layout";
import RecruiterView from "./Recruiter/RecuiterView";
import CandidateView from "./CandidateView";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  return (
    <Layout>
      {role === "recruiter" ? <RecruiterView  /> : <CandidateView role={role}/>}
    </Layout>
  );
};

export default Dashboard;
