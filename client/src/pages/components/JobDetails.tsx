import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Gift,
  Mail,
  MapPin,
  User,
  Users,
} from "lucide-react";

const JobDetails = ({
  isDrawerOpen,
  handleCloseDrawer,
  selectedApplication,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100";
    }
  };

  if (!isDrawerOpen) return null;

  const Content = (
    <>
      {/* Content Section */}
      <div className="flex-1 p-2 sm:p-6 space-y-2 sm:space-y-8 overflow-y-auto">
        {/* Candidate Profile */}
        <section className="space-y-4 sm:space-y-2">
          <h2 className="text-md sm:text-lg font-semibold flex items-center">
            <User className="mr-2 h-5 w-5 text-blue-500" />
            Candidate Profile
          </h2>
          <Card className="p-3 mt-0">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-md sm:text-lg  font-semibold text-blue-600">
                  {selectedApplication.candidate.charAt(0)}
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <div>
                  <h3 className="font-semibold text-md sm:text-lg ">
                    {selectedApplication.candidate}
                  </h3>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {selectedApplication.candidateEmail}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Position Details */}
        <section className="space-y-4 sm:space-y-2">
          <h2 className="text-md sm:text-lg  font-semibold flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
            Position Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
            <Card className="p-4">
              <div className="flex items-center text-gray-500 mb-1">
                <DollarSign className="h-4 w-4 mr-2" />
                Salary
              </div>
              <p className="font-semibold">{selectedApplication.salary}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center text-gray-500 mb-1">
                <Clock className="h-4 w-4 mr-2" />
                Job Type
              </div>
              <p className="font-semibold">{selectedApplication.jobType}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center text-gray-500 mb-1">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </div>
              <p className="font-semibold">{selectedApplication.location}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center text-gray-500 mb-1">
                <Users className="h-4 w-4 mr-2" />
                Department
              </div>
              <p className="font-semibold">{selectedApplication.department}</p>
            </Card>
          </div>

          <Card className="p-4 space-y-3">
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Start Date:{" "}
              <span className="font-semibold ml-1">
                {selectedApplication.startDate}
              </span>
            </div>
            <div className="flex items-center text-gray-500">
              <Briefcase className="h-4 w-4 mr-2" />
              Position: {selectedApplication.position}
              <span className="font-semibold ml-1">
                {selectedApplication.reportingTo}
              </span>
            </div>
          </Card>
        </section>

        {/* Job Description */}
        <section className="space-y-4 sm:space-y-2">
          <h2 className="text-md sm:text-lg  font-semibold">Job Description</h2>
          <Card className="p-4">
            <p className="text-gray-600 leading-relaxed">
              {selectedApplication.jobDescription}
            </p>
          </Card>
        </section>

        {/* Benefits */}
        <section className="space-y-4 sm:space-y-2">
          <h2 className="text-md sm:text-lg  font-semibold flex items-center">
            <Gift className="mr-2 h-5 w-5 text-blue-500" />
            Benefits Package
          </h2>
          <Card className="p-4">
            <ul className="space-y-2">
              {selectedApplication.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Additional Notes */}
        {selectedApplication.additionalNotes && (
          <section className="space-y-4 sm:space-y-2">
            <h2 className="text-md sm:text-lg  font-semibold">
              Additional Notes
            </h2>
            <Card className="p-4">
              <p className="text-gray-600 italic">
                {selectedApplication.additionalNotes}
              </p>
            </Card>
          </section>
        )}
      </div>
    </>
  );

  return isMobile ? (
    <Dialog open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
      <DialogContent className="max-w-sm w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>
            Review the application details below.
          </DialogDescription>
        </DialogHeader>
        <div>{Content}</div>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={handleCloseDrawer}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Sheet open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
      <SheetContent className="w-[450px] sm:w-[540px] overflow-y-auto p-0">
        <div className="h-full flex flex-col ">
          {/* Header Section */}
          <div className="p-6 bg-gray-50 border-b">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold">
                Application Details
              </SheetTitle>

              <div className="flex items-center justify-between">
                <SheetDescription className="text-sm text-gray-500">
                  Application submitted on {selectedApplication.date}
                </SheetDescription>
                <Badge className={getStatusColor(selectedApplication.status)}>
                  {selectedApplication.status}
                </Badge>
              </div>
            </SheetHeader>
          </div>
          <div>{Content}</div>
          {/* Footer Section */}
          <div className="border-t p-6 bg-gray-50">
            <SheetFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline" onClick={handleCloseDrawer}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default JobDetails;
