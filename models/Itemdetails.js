import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
import User from "./userModel.js";
import Product from "./ProductModel.js";
import Payment from "./Payment.js";

const ItemDetail = db.define("ItemDetail", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  payment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    references: {
      model: Payment,
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust decimal precision as needed
    allowNull: false,
  },
});

// Define associations (optional)
// ItemDetail.belongsTo(User, { foreignKey: 'user_id' });


export default ItemDetail;
