const Sequelize = require("sequelize");

const transaction = await sequelize.transaction(); // Begin transaction
async function purchaseProducts(cart, transaction) {
  try {
    for (const item of cart) {
      const productId = item.idproduct;
      const quantity = item.quantity;

      // Lock the product row for update
      const product = await Product.findByPk(productId, {
        lock: true,
        transaction,
      });

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      if (product.stock < quantity) {
        throw new Error(`Insufficient stock for product with ID ${productId}`);
      }

      // Update stock after successful validation
      await product.decrement("stock", { by: quantity, transaction });
    }

    // All validations and updates successful, commit the transaction

    return { message: "Purchase successful" };
  } catch (error) {
    // Rollback the transaction on any errors
    await transaction.rollback();
    throw error;
  }
}
