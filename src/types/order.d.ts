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
