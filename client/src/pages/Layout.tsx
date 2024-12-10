import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="bg-white w-full p-4 rounded-md shadow-md">
        <h1 className="text-2xl w-full font-semibold">Recruiter Dashboard</h1>
      </div>
      <div className="h-[calc(100vh-95px)]">{children}</div>
    </div>
  );
};

export default Layout;
