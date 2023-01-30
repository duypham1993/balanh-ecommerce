import Customer from "../models/Customer";

export const updateInfoOrder = async (order) => {
  const orders = await Promise.all(order?.map(async (item) => {
    const fullInfoCustomer = await Customer.findById(item.customerID, "name email");
    return {
      ...item._doc,
      customerName: fullInfoCustomer?.name,
      customerEmail: fullInfoCustomer?.email
    }
  }))
  return orders;
}

