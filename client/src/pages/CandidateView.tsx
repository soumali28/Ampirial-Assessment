import React, { useState } from "react";
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
import { downloadPDF } from "@/lib/utils";

const CandidateView = () => {
  const offers = [
    {
      id: 1,
      companyName: "Acme Corp",
      companyEmail: "5v0Ml@example.com",
      candidate: "John Doe",
      status: "Pending",
      position: "Frontend Developer",
      date: "24-12-2022",
      jobTitle: "Frontend Developer",
      jobDescription:
        "Develop user-facing features and ensure application responsiveness.",
      salary: "$80,000/year",
      candidateEmail: "johndoe@example.com",
      jobType: "Full-Time",
      startDate: "01-01-2023",
      department: "Engineering",
      location: "New York, NY",
      benefits: ["Health Insurance", "401(k) Matching", "Paid Time Off"],
      additionalNotes:
        "Candidate has strong experience with React.js and Redux.",
    },
    // Example of a completed offer
    {
      id: 2,
      companyName: "TechCo",
      companyEmail: "5v0Ml@example.com",
      candidate: "John Doe",
      status: "Completed",
      position: "Frontend Developer",
      date: "20-12-2022",
      jobTitle: "Senior Frontend Developer",
      jobDescription:
        "Lead frontend development initiatives and mentor junior developers.",
      salary: "$95,000/year",
      candidateEmail: "johndoe@example.com",
      jobType: "Full-Time",
      startDate: "01-02-2023",
      department: "Engineering",
      location: "San Francisco, CA",
      benefits: ["Health Insurance", "401(k) Matching", "Unlimited PTO"],
      additionalNotes:
        "Excellent cultural fit with strong leadership potential.",
    },
  ];

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
    setOpenDialog(!openDialog);
  };

  const handleAcceptOffer = (signature) => {
    // Handle the offer acceptance with the signature
    console.log(`Offer accepted with signature: ${signature}`);
    // You could call your downloadPDF function here
    downloadPDF({ ...selectedApplication, signature });
  };

  
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
      default:
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";
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
                    Applied on {offer.date}
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
                      <span className="text-sm">
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
                      <span className="text-sm">Type: {offer.jobType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        Start Date: {offer.startDate}
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
                {offer.status === "Pending" && (
                  <div className="flex justify-between items-center gap-12 w-full">
                    <Button size="lg" className="w-md" variant="outline">
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
                {offer.status === "Completed" && (
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
        handleCloseDialog={openAcceptDialog}
        selectedApplication={selectedApplication}
        handleSubmit={handleAcceptOffer}
        role={"candidate"}
        signature={signature}
        setSignature={setSignature}
      />
    </div>
  );
};

export default CandidateView;
