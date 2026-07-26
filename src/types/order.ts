export type Order = {
  payment_method: "wallet";
  items: OrderItem[];
};

export type OrderItem = {
  title: string;
  dkp: string;
  quantity: number;
  image_url: string;
  serial: string;
  unit_price: number;
  warranty: number;
};

export type DkpResponse = {
  status: number;
  data: {
    product: {
      /**
       * for inactive products only
       */
      is_inactive: boolean;
      title_fa: string;
      status: "marketable" | "out_of_stock";

      images: {
        main: {
          url: string[];
          webp_url: string[];
        };
      };
      default_variant: {
        price: {
          selling_price: number;
          order_limit: number;
        };
      };
    };
  };
};

export type CreateReceipt = {
  payment_method: "wallet";
  items: CreateReceiptItem[];
};

export type CreateReceiptItem = {
  dkp: string;
  quantity: number;
  serial: string;
};

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  CANCELED = "canceled",
  COMPLETED = "completed",
}

export type CreateReceiptResponse = {
  id: number;
  status: OrderStatus;
  date: string;
};

export type OrderGridData = {
  id: number;
  total_price: number;
  tracking_code: number;
  status: OrderStatus;
  payment_method: "wallet";
  created_at: Date;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  order_items: OrderItemInAllOrder[];
};

export type OrderSearchItems = {
  status?: OrderStatus;
  trackingCode?: string;
  creatorName?: string;
};

export type OrderItemInAllOrder = {
  id: number;
  order_id: number;
  title: string;
  dkp: string;
  quantity: number;
  image_url: string;
  serial: string;
  unit_price: string;
  warrantyPrice: number;
};
