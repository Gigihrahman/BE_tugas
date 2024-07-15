import User from "./models/userModel.js";

const destinasi = await User.findOne({ where: { id: 1 } });

console.log(destinasi.subdistricts_code);
