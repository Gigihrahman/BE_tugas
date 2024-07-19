import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ItemDetail from "./Itemdetails.js";
import User from "./userModel.js";
const { DataTypes } = Sequelize;

const Payment = db.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },

  transaction_id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  gross_amount: {
    type: DataTypes.DECIMAL(10, 2), // Adjust decimal precision as needed
    allowNull: false,
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transaction_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


export default Payment;

