import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import  bcrypt  from 'bcrypt';

const { DataTypes } = Sequelize;

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      lowercase: true,
    },
    province_code: {
      type: DataTypes.INTEGER,
    },
    city_code: {
      type: DataTypes.INTEGER,
    },
    subdistricts_code: {
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);
export default User;

(async () => {
  await db.sync();
})();