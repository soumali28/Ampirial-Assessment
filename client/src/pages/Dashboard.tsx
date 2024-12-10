import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "./Layout";
import RecruiterView from "./Recruiter/RecuiterView";

const Dashboard = () => {
  // Simulate user role (recruiter or candidate)
  const [role, setRole] = useState("recruiter"); // Change this to "candidate" to see different views.

  return (
    <Layout>
      {role === "recruiter" ? <RecruiterView /> : <CandidateView />}
    </Layout>
  );
};

const CandidateView = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
      <div className="space-y-4">
        <div className="border p-4 rounded-md">
          <p className="text-gray-700">Recruiter: XYZ Company</p>
          <p className="text-gray-600">Status: Pending Your Signature</p>
          <Button className="mt-2">Sign Application</Button>
        </div>
        <div className="border p-4 rounded-md">
          <p className="text-gray-700">Recruiter: ABC Corporation</p>
          <p className="text-gray-600">Status: Completed</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
