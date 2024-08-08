import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import bcrypt from "bcrypt";

const { DataTypes } = Sequelize;

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    number_phone: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(80),
      allowNull: false,
      lowercase: true,
    },
    province_code: {
      type: DataTypes.INTEGER(5),
    },
    city_code: {
      type: DataTypes.INTEGER(5),
    },
    subdistricts_code: {
      type: DataTypes.INTEGER(5),
    },
    full_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },

      beforeBulkUpdate: async (options) => {
        // Ensure that there is a password to hash
        if (options.attributes.password) {
          // Generate salt
          const salt = await bcrypt.genSalt(10);
          // Hash the new password
          options.attributes.password = await bcrypt.hash(
            options.attributes.password,
            salt
          );
        }
      },
    },
  }
);
const Merk = db.define(
  "Merk",
  {
    id: {
      type: DataTypes.INTEGER(4),
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Allow images to be null
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "merks",
  }
);
const Product = db.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false, // Make name a required field (optional)
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true, // Allow images to be null
    },
    price: {
      type: DataTypes.INTEGER(8),
      allowNull: false, // Make price a required field (optional)
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Allow descriptions to be null
    },
    berat: {
      // Assuming 'berat' refers to weight
      type: DataTypes.INTEGER(4),
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
    stock: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
    },
  },
  {
    tableName: "products",
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);

const Payment = db.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER(5),
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
      type: DataTypes.INTEGER(10), // Adjust decimal precision as needed
      allowNull: false,
    },

    transaction_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipient_name: {
      type: DataTypes.STRING(100),
    },
    recipient_province: {
      type: DataTypes.INTEGER(5),
    },
    recipient_district: {
      type: DataTypes.INTEGER(5),
    },
    recipient_subdistrict: {
      type: DataTypes.INTEGER(5),
    },
    recipient_fulladdress: {
      type: DataTypes.TEXT,
    },
    recipient_phoneNumber: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
  },
  {
    tableName: "payments",
  }
);

const ItemDetail = db.define(
  "ItemDetail",
  {
    id: {
      type: DataTypes.INTEGER(5),
      autoIncrement: true,
      primaryKey: true,
    },
    payment_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: "payments",
        key: "id",
      },
    },

    product_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER(8), // Adjust decimal precision as needed
      allowNull: false,
    },
  },
  {
    tableName: "item_details",
  }
);
const Admin = db.define(
  "Admin",
  {
    name: {
      type: DataTypes.STRING(10),
    },
    password: {
      type: DataTypes.STRING(80),
    },
  },
  {
    tableName: "admin",
  }
);

Payment.hasMany(ItemDetail, { as: "itemDetails", foreignKey: "payment_id" });

Payment.belongsTo(User, { as: "user", foreignKey: "user_id" });

ItemDetail.belongsTo(Product, { foreignKey: "product_id" });
ItemDetail.belongsTo(Payment, { foreignKey: "payment_id" });

Product.hasMany(ItemDetail, { as: "itemDetails", foreignKey: "product_id" });
Product.belongsTo(Merk, { as: "merk", foreignKey: "merkId" });

User.hasMany(Payment, { as: "payments", foreignKey: "user_id" });
Merk.hasMany(Product, { as: "products", foreignKey: "merkId" });

(async () => {
  await db.sync();
})();

export { User, Product, Merk, Payment, ItemDetail, Admin };
// Define associations (optional)
// ItemDetail.belongsTo(User, { foreignKey: 'user_id' });
