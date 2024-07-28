import { User } from "../models/allModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Verify password
    const passwordValid = await bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
      return res.status(404).json("Incorrect email and password combination");
    }

    // Authenticate user with jwt
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "secretkey"
    );

    res.status(200).send({
      id: user.id,
      username: user.username,
      token: token,
    });
  } catch (err) {
    return res.status(500).send("Sign in error" + err);
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers["token"];
    const decoded = jwt.verify(token, "secretkey");
    const id = decoded.id;
    const t = jwt.sign({ id: id }, "secretkey", { expiresIn: "1s" });
    res.status(200).json({
      message: "Logout Berhasil",
      success: true,
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};
export const register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const province = req.body.province || 0;
  const city = req.body.city || 0;
  const subdistricts = req.body.subdistrict || 0;
  const full_address = req.body.full_address;
  const emailExist = await User.findOne({ where: { email: email } });
  const numberPhone = req.body.numberPhone;
  if (!username || !confirmPassword || !password || !full_address) {
    return res
      .status(401)
      .json({ message: "missing required data", success: false });
  }
  if (emailExist)
    return res.status(400).json({ message: "This email was used" });

  if (password !== confirmPassword)
    return res.status(401).json({ message: "confirm password not same" });

  const user = await User.create({
    username: username,
    email: email,
    number_phone: numberPhone,
    password: password,
    province_code: province,
    city_code: city,
    subdistricts_code: subdistricts,
    full_address: full_address,
  });

  const token = jwt.sign({ id: user.id }, "secretkey");
  res.status(200).send({ id: user.id, username: user.username, token: token });
};

export const editProfileUser = async (req, res) => {
  const tokenUser = req.headers["token"];

  const decoded = jwtDecode(tokenUser);
  const idUser = decoded.id;
  const username = req.body.username;
  const numberPhone = req.body.numberPhone;

  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const province = req.body.province || 0;
  const city = req.body.city || 0;
  const subdistricts = req.body.subdistrict || 0;
  const full_address = req.body.full_address;
  if (!username || !confirmPassword || !password) {
    return res
      .status(401)
      .json({ message: "missing required data", success: false });
  }

  if (password !== confirmPassword)
    return res.status(401).json({ message: "confirm password not same" });

  await User.update(
    {
      username: username,
      password: password,
      number_phone: numberPhone,
      province_code: province,
      city_code: city,
      subdistricts_code: subdistricts,
      full_address: full_address,
    },
    {
      where: {
        id: idUser,
      },
    }
  );
  res.status(200).json({ message: "Your profile was updated" });
};

export const getUserByid = async (req, res) => {
  const tokenUser = req.headers["token"];

  const decoded = jwtDecode(tokenUser);
  const idUser = decoded.id;

  const merk = await User.findOne({ where: { id: idUser } });
  res.status(200).json({ merk });
};