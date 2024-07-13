import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const ItemDetail = db.define("ItemDetail", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  payment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
// ItemDetail.belongsTo(Product, { foreignKey: 'product_id' });

export default ItemDetail;
