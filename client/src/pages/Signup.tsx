import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("click", e.target.checked);
    setFormData((prev) => ({
      ...prev,
      role: e.target.checked ? "recruiter" : "candidate",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message || "Failed to sign up");
      }

      toast.success("Sign up successful!");
      setFormData({ name: "", email: "", password: "", role: "candidate" });
      navigate("/");
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-md shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" onChange={handleCheckboxChange} />
            <label
              htmlFor="role"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Recruiter
            </label>
          </div>
          <Button className="w-full mt-4" type="submit">
            Sign Up
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
