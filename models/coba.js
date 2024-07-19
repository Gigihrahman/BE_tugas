import { Product, Merk } from "./allModel.js";
import db from "../config/Database.js";

const cek = async () => {
  await db.sync();
};

console.log(cek);
