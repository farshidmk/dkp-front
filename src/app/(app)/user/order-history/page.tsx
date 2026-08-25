"use client";

import OrderHistoryGrid from "./_components/OrderHistoryGrid";

const OrderHistoryPage = () => {
  return (
    <div className="flex-1 overflow-auto h-full flex flex-col">
      <OrderHistoryGrid />
    </div>
  );
};

export default OrderHistoryPage;
