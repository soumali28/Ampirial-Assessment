import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "@/apis/logout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        toast.success("Successfully logged out");
        navigate("/auth/signin");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="bg-white w-full p-4 rounded-md shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl w-full font-semibold">
            {role === "recruiter" ? "Recruiter " : "Candidate "}
            Dashboard
          </h1>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant={"ghost"} onClick={handleLogout}>
                  <LogOut className="text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="mt-2 text-sm"
                side="bottom"
                align="center"
              >
                Click to logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="h-[calc(100vh-95px)]">{children}</div>
    </div>
  );
};

export default Layout;
