import LoginWithGoogleButton from "@/components/buttons/LoginWithGoogleButton";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 bg-slate-100 border p-4 max-w-xs mx-auto rounded-md">
        <h1 className="text-4xl font-bold text-center text-primary">Sign In</h1>
        <LoginWithGoogleButton />
      </div>
    </div>
  );
};

export default LoginPage;
