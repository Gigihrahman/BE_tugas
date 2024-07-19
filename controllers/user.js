import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


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
export const register =async(req,res)=>{
  const saltAround = 10;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const province = req.body.province || 0;
  const city = req.body.city|| 0;
  const subdistricts = req.body.subdistrict|| 0;
   if (!username || !confirmPassword || !password) {
     return res
       .status(401)
       .json({ message: "missing required data", success: false });
   }

   if (password !== confirmPassword)
     return res.status(401).json({ message: "confirm password not same" });

  const user = await User.create({username:username,email:email,password:password,province_code:province,city_code:city,subdistricts_code:subdistricts})

 
 
  const token = jwt.sign({ id: user.id }, "secretkey");
  res.status(200).send({ id: user.id, username: user.username, token: token});


}
