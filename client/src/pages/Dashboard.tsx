import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "./Layout";
import RecruiterView from "./Recruiter/RecuiterView";
import CandidateView from "./CandidateView";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const [data, setData] = useState(null);

  const apiUrl =
    role === "candidate"
      ? `http://localhost:5001/api/users/recruiters?email=${email}`
      : "http://localhost:5001/api/users/candidates";

  const getUsers = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [role]);

  return (
    <Layout>
      {role === "recruiter" ? (
        <RecruiterView candidates={data} />
      ) : (
        <CandidateView role={role} data={data} getUsers={getUsers} />
      )}
    </Layout>
  );
};

export default Dashboard;
