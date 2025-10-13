import { DkpResponse, OrderItem } from "@/types/order";

const mapDkpResponseToOrderItem = (dkpResponse: DkpResponse) => {
  const result: OrderItem = {
    dkp: "",
    image_url: dkpResponse.data?.product?.images?.main?.webp_url?.[0],
    quantity: 0,
    serial: "",
    title: dkpResponse?.data?.product?.title_fa,
    unit_price:
      dkpResponse?.data?.product?.default_variant?.price?.selling_price,
    warranty: 0,
  };
  return result;
};

export default mapDkpResponseToOrderItem;
