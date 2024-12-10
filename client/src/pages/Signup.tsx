import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-md shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Enter your name" />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          <Button className="w-full mt-4">Sign Up</Button>
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
