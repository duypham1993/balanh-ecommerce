import Product from "../models/Product.js";

export const getInfoProductForCart = async (cart) => {
  const products = await Promise.all(cart.products?.map(async (product) => {
    const updateInfoProduct = await Product.findById(product._id, "name price packing imgs qty isActive");

    if (product.qty > updateInfoProduct.qty) {
      product.qty = updateInfoProduct.qty
    }
    return {
      ...updateInfoProduct._doc,
      qty: product.qty,
      maxQty: updateInfoProduct.qty
    }
  }));
  const filterProducts = products.filter(product => product.isActive === true);
  return {
    ...cart._doc,
    products: filterProducts,
  }
} 