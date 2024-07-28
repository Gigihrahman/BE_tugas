import { Admin } from "../models/allModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const admin = await Admin.findOne({
      where: { name },
    });
    if (!admin) {
      return res.status(404).json("admin not found");
    }

    // Verify password
    const passwordValid = await bcrypt.compareSync(password, admin.password);
    if (!passwordValid) {
      return res.status(404).json("Incorrect email and password combination");
    }

    // Authenticate admin with jwt
    const token = jwt.sign({ id: admin.id, name: admin.name }, "secretkey");

    res.status(200).send({
      tokenAdmin: token,
    });
  } catch (err) {
    return res.status(500).send("Sign in error" + err);
  }
};
