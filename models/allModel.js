import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
import bcrypt from "bcrypt";

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
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);
const Merk = db.define("merk", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
const Product = db.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    merkId: {
      // Assuming 'merk' refers to brand
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Merk,
        key: "id",
      }, // Allow brand to be null
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true, // Allow URL to be null
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);

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
      table: "Payment",
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      table: "user",
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      table: "product",
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
Payment.hasMany(ItemDetail);
ItemDetail.belongsTo(Payment, { as: "payment", foreignKey: "payment_id" });
Product.hasMany(ItemDetail); // Typo correction: Use 'Product' instead of 'Produk'
ItemDetail.belongsTo(Product, { as: "product", foreignKey: "product_id" });

User.hasMany(ItemDetail);
ItemDetail.belongsTo(User, { as: "user", foreignKey: "user_id" });

User.hasMany(Payment, { as: "payments", foreignKey: "user_id" });
Payment.belongsTo(User, { as: "user", foreignKey: "user_id" });
Merk.hasMany(Product, { as: "products", foreignKey: "merkId" });
Product.belongsTo(Merk, { as: "merk", foreignKey: "merkId" });

export { User, Product, Merk, Payment, ItemDetail };

(async () => {
  await db.sync();
})();

// Define associations (optional)
// ItemDetail.belongsTo(User, { foreignKey: 'user_id' });
