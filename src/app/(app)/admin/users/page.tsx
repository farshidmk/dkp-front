"use client";

import UsersGrid from "./_components/UsersGrid";

const UsersPage = () => {
  return (
    <>
      <div className="flex-1 overflow-auto h-full flex flex-col">
        <UsersGrid />
      </div>
    </>
  );
};

export default UsersPage;
