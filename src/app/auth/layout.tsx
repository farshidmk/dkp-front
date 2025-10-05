import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen  p-4">
        <div className="w-full max-w-xl shadow-2xl rounded-3xl">
          <div className="w-full rounded-2xl bg-white/50 backdrop-blur-md backdrop-saturate-125 shadow-xl p-4 border-2 border-primary">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
