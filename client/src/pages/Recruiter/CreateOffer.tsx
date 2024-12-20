import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  X,
  Plus,
  DollarSign,
  Mail,
  User,
  Briefcase,
  Check,
} from "lucide-react";
import AcceptDialog from "../components/AcceptDialog";
import { downloadPDF } from "@/lib/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateOffer = () => {
  const role = localStorage.getItem("role");
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    jobTitle: "",
    jobDescription: "",
    salary: "",
    candidateName: "",
    candidateEmail: "",
    jobType: "",
    startDate: "",
    department: "",
    location: "",
    benefits: [""],
    additionalNotes: "",
    recruiterSignature: "",
    candidateSignature: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [signature, setSignature] = useState("");
  const navigate = useNavigate();

  const departments = [
    "Engineering",
    "Product",
    "Design",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ""] });
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: updatedBenefits });
  };

  const handleBenefitChange = (value, index) => {
    const updatedBenefits = formData.benefits.map((benefit, i) =>
      i === index ? value : benefit
    );
    setFormData({ ...formData, benefits: updatedBenefits });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, recruiterSignature: signature };

    try {
      const response = await fetch("http://localhost:5001/api/offer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        toast.error("Something went wrong");
        throw new Error("Failed to create offer");
      }

      const data = await response.json();
      setFormData({ ...formData, recruiterSignature: signature });
      toast.success("Offer created successfully!");
      navigate("/");
      setSignature("");
      // Trigger PDF download
      //downloadPDF(updatedFormData);
    } catch (error) {
      console.error("Error creating offer:", error.message);
    }
  };

  const openAcceptDialog = (formData) => {
    setSelectedApplication(formData);
    setOpenDialog(!openDialog);
  };

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-500" />
            Create Job Offer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name *
                  </label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apple"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Email *
                  </label>
                  <Input
                    id="companyEmail"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    placeholder="e.g. lDd0L@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Title *
                  </label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Department *
                  </label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData({ ...formData, department: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase()}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Annual Salary *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="salary"
                      name="salary"
                      type="number"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="pl-8"
                      placeholder="e.g. 120000"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="candidateName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Candidate Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="candidateName"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleInputChange}
                      className="pl-8"
                      placeholder="Enter candidate's name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="candidateEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Candidate Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="candidateEmail"
                      name="candidateEmail"
                      type="email"
                      value={formData.candidateEmail}
                      onChange={handleInputChange}
                      className="pl-8"
                      placeholder="Enter candidate's email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="jobType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Type *
                  </label>
                  <Select
                    value={formData.jobType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, jobType: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="part-time">Part-Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. New York, NY (Remote)"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date *
                  </label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="jobDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Description *
              </label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Enter detailed job description, responsibilities, and requirements"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefits
              </label>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) =>
                        handleBenefitChange(e.target.value, index)
                      }
                      placeholder={`e.g. Health Insurance, 401(k), etc.`}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveBenefit(index)}
                        className="shrink-0"
                      >
                        <X className="h-4 w-4 text-rose-500" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddBenefit}
                  className="mt-2 text-blue-500 hover:text-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </div>
            </div>

            <div>
              <label
                htmlFor="additionalNotes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Notes
              </label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any additional information or special instructions for the candidate"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3">
              {/* <Button type="button" variant="outline">
                Save as Draft
              </Button> */}
              <Button
                className="px-8"
                onClick={(e) => {
                  e.preventDefault();
                  openAcceptDialog(formData);
                }}
              >
                Send Offer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <AcceptDialog
        isDialogOpen={openDialog}
        handleCloseDialog={openAcceptDialog}
        selectedApplication={selectedApplication}
        handleSubmit={handleSubmit}
        role={role}
        signature={signature}
        setSignature={setSignature}
      />
    </div>
  );
};

export default CreateOffer;
