import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;


const Merk = db.define("merk", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:true
  },
  name :{
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Merk;


(async () => {
  await db.sync();
})();
