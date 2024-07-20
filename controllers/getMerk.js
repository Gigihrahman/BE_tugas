import { Merk } from "../models/allModel.js";

export const getMerk = async (req, res) => {
  const merk = await Merk.findAll({ attributes: ["id", "name"] });
  res.status(200).json({ merk });
};
