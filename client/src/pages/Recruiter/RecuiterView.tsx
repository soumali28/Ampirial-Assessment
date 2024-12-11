import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import JobDetails from "../components/JobDetails";
import toast from "react-hot-toast";

interface Candidate {
  _id: string;
  name: string;
  offers: [];
}

interface RecruiterViewProps {
  candidates: Candidate[];
}

const RecruiterView: React.FC<RecruiterViewProps> = ({ candidates }) => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState({
    name: "",
    email: "",
    offer: {},
  });

  const handleCreateOffer = () => {
    navigate("/create-offer");
  };

  const getDetails = async (id, offer) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/users/candidates/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        toast.error("Something went wrong");
        throw new Error("Failed to create offer");
      }

      const data = await response.json();
      const name = data.name;
      const email = data.email;
      setSelectedApplication({ name, email, offer });
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    //setSelectedApplication(id);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";

      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md mt-4 h-[calc(100vh-115px)]">
      <div className="flex justify-end items-center mb-2 p-6">
        <Button onClick={handleCreateOffer}>Create Offer</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Candidate
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Position
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {candidates &&
              candidates.map((candidate) =>
                candidate.offers.map((offer) => (
                  <tr
                    key={offer._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {candidate.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {offer.jobTitle}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                          offer.status
                        )}`}
                      >
                        {offer.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(offer.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm"
                          onClick={() => getDetails(offer.candidate, offer)}
                        >
                          View Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
