import ItemDetail from "./Itemdetails.js";
import Merk from "./merk.js";
import Payment from "./Payment.js";
import Product from "./ProductModel.js";
import User from "./userModel.js";

// ItemDetail.belongsTo(Product, { foreignKey: "product_id" });
// ItemDetail.belongsTo(Payment, { foreignKey: "payment_id" });
// ItemDetail.belongsTo(User, { foreignKey: "user_id" });
// Payment.belongsTo(User, { foreignKey: "user_id" });
// Product.belongsTo(Merk, { foreignKey: "merk" });

// Payment.hasMany(ItemDetail, { foreignKey: "payment_id" });
// Produk.hasMany(ItemDetail, { foreignKey: "product_id" });
// User.hasMany(ItemDetail, { foreignKey: "user_id" });
// User.hasMany(Payment, { foreignKey: "user_id" });
// Merk.hasMany(Product, { foreignKey: "merk" });

ItemDetail.belongsTo(Product);
ItemDetail.belongsTo(Payment);
ItemDetail.belongsTo(User);

Payment.hasMany(ItemDetail);
Payment.belongsTo(User);
Produk.hasMany(ItemDetail);
Product.belongsTo(Merk);
User.hasMany(ItemDetail);
User.hasMany(Payment);
Merk.hasMany(Product);

export { User, Product, Merk, Payment, ItemDetail };
