import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "./Layout";
import RecruiterView from "./Recruiter/RecuiterView";
import CandidateView from "./CandidateView";

const Dashboard = () => {
  // Simulate user role (recruiter or candidate)
  const [role, setRole] = useState("candidate"); // Change this to "candidate" to see different views.

  return (
    <Layout>
      {role === "recruiter" ? <RecruiterView /> : <CandidateView />}
    </Layout>
  );
};

export default Dashboard;
