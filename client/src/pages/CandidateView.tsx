import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  DollarSign,
  MapPin,
  Building,
  Mail,
  Clock,
  Users,
} from "lucide-react";
import JobDetails from "./components/JobDetails";
import AcceptDialog from "./components/AcceptDialog";
import { downloadPDF, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

const CandidateView = ({ role, data, getUsers }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  const { email, offers } = data;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [signature, setSignature] = useState("");

  const handleOpenDrawer = (application) => {
    setSelectedApplication(application);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const openAcceptDialog = (application) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };
  const closeAcceptDialog = () => {
    setOpenDialog(false);
  };

  const updateOfferStatus = async (offerId:any, status:any, signature:any) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/offer/update/status/${offerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status , signature}),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Status updated successfully!");
        getUsers();
      } else {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
    <div className="bg-white rounded-md shadow-md mt-4 h-[calc(100vh-115px)] overflow-hidden">
      <div className="mx-auto p-6 overflow-y-auto h-full">
        <h2 className="text-2xl font-semibold mb-6">Your Job Offers</h2>
        <div className="grid grid-cols-1 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <h3 className="text-xl font-semibold">{offer.jobTitle}</h3>
                  <p className="text-sm text-gray-500">
                    Click on accept to accept your offer.
                  </p>
                </div>
                <Badge className={getStatusBadge(offer.status)}>
                  {offer.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="text-sm capitalize">
                        Department: {offer.department}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        Location: {offer.location}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm">Salary: {offer.salary}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm capitalize">
                        Type: {offer.jobType}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        Start Date: {formatDate(offer.startDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {offer.benefits.length} Benefits
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Job Description</h4>
                  <p className="text-sm text-gray-600">
                    {offer.jobDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {offer.benefits.map((benefit, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                {offer.status === "pending" && (
                  <div className="flex justify-between items-center gap-12 w-full">
                    <Button
                      size="lg"
                      className="w-md"
                      variant="outline"
                      onClick={() => updateOfferStatus(offer._id, "rejected", signature)}
                    >
                      Decline
                    </Button>
                    <Button
                      size="lg"
                      className="w-2xl"
                      onClick={() => openAcceptDialog(offer)}
                    >
                      Accept
                    </Button>
                  </div>
                )}
                {offer.status === "accepted" && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => handleOpenDrawer(offer)}
                  >
                    View Details
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <JobDetails
        isDrawerOpen={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        selectedApplication={selectedApplication}
      />
      <AcceptDialog
        isDialogOpen={openDialog}
        handleCloseDialog={closeAcceptDialog}
        selectedApplication={selectedApplication}
        handleSubmit={updateOfferStatus}
        role={role}
        signature={signature}
        setSignature={setSignature}
      />
    </div>
  );
};

export default CandidateView;
