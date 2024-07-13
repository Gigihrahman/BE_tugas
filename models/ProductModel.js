import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define(
  "product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Make name a required field (optional)
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Allow images to be null
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false, // Make price a required field (optional)
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Allow descriptions to be null
    },
    berat: {
      // Assuming 'berat' refers to weight
      type: DataTypes.INTEGER,
      allowNull: true, // Allow weight to be null
    },
    merk: {
      // Assuming 'merk' refers to brand
      type: DataTypes.INTEGER,
      allowNull: true, // Allow brand to be null
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true, // Allow URL to be null
    },
  },
  {
    freezeTableName: true,
  }
);


export default Product;

(async()=>{
    await db.sync();
})();

