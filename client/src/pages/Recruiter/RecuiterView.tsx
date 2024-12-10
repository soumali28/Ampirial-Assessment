import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import JobDetails from "../components/JobDetails";

const RecruiterView: React.FC = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleCreateOffer = () => {
    navigate("/create-offer");
  };

  const handleOpenDrawer = (application) => {
    setSelectedApplication(application);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const applications = [
    {
      id: 1,
      candidate: "John Doe",
      status: "Pending",
      position: "Frontend Developer",
      date: "24-12-2022",
      jobTitle: "Frontend Developer",
      jobDescription: "Develop user-facing features and ensure application responsiveness.",
      salary: "$80,000/year",
      candidateEmail: "johndoe@example.com",
      jobType: "Full-Time",
      startDate: "01-01-2023",
      department: "Engineering",
      location: "New York, NY",
      benefits: ["Health Insurance", "401(k) Matching", "Paid Time Off"],
      additionalNotes: "Candidate has strong experience with React.js and Redux.",
    },
    {
      id: 2,
      candidate: "Jane Smith",
      status: "Accepted",
      position: "Backend Developer",
      date: "24-12-2022",
      jobTitle: "Backend Developer",
      jobDescription: "Build and maintain server-side logic and databases.",
      salary: "$90,000/year",
      candidateEmail: "janesmith@example.com",
      jobType: "Contract",
      startDate: "15-01-2023",
      department: "Backend Team",
      location: "San Francisco, CA",
      benefits: ["Remote Work Option", "Professional Development Stipend"],
      additionalNotes: "Impressive knowledge of Node.js and MongoDB.",
    },
  ];
  

  return (
    <div className="bg-white rounded-md shadow-md mt-4 h-[calc(100vh-115px)]">
      <div className="flex justify-end items-center mb-2 p-6">
        <Button onClick={handleCreateOffer}>Create Offer</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Candidate</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Position</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((application) => (
              <tr 
                key={application.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {application.candidate.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{application.candidate}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{application.position}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(application.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="text-sm"
                      onClick={() => handleOpenDrawer(application)}
                    >
                      View Details
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <JobDetails
        isDrawerOpen={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        selectedApplication={selectedApplication}
      />
    </div>
  );
};

export default RecruiterView;
