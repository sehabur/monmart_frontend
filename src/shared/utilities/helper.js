export const calculateCartAmount = (products) => {
  const totalProductPrice =
    products &&
    Number(
      products
        .reduce(
          (totalAmount, product) =>
            totalAmount + product.price * product.quantity,
          0
        )
        .toFixed(2)
    );
  const shippingCost = 60;
  const totalAmount = Number((totalProductPrice + shippingCost).toFixed(2));

  return {
    totalProductPrice: totalProductPrice,
    shippingCost,
    totalAmount: totalAmount,
  };
};
