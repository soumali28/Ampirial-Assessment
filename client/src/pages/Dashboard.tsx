import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "./Layout";
import RecruiterView from "./Recruiter/RecuiterView";
import CandidateView from "./CandidateView";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const [data, setData] = useState(null);

  const apiUrl =
    role === "candidate"
      ? "http://localhost:5001/api/users/recruiters"
      : "http://localhost:5001/api/users/candidates";
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setData(data);
        console.log("Data", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <Layout>
      {role === "recruiter" ? (
        <RecruiterView candidates={data} />
      ) : (
        <CandidateView role={role} />
      )}
    </Layout>
  );
};

export default Dashboard;
