import { Merk } from "../models/allModel.js";
import path from "path";
import fs from "fs";

export const getMerk = async (req, res) => {
  const merk = await Merk.findAll({});
  res.status(200).json({ merk });
};

export const saveMerk = async (req, res) => {
  const name = req.body.name;
  const file = req.files.file;
  if (!file) return res.status(404).json({ message: "upload image please" });
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  console.log(fileName);
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });

    await Merk.create({
      name: name,
      image: fileName,
      url: url,
    });
    res.status(201).json({ message: "Product Created Successfuly" });
  });
};

export const updateMerk = async (req, res) => {
  console.log(req.params.id);
  const merks = await Merk.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!merks) return res.status(404).json({ message: "data not found" });

  let fileName = "";
  if (req.files === null) {
    fileName = merks.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;

    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Image must be less than 5 MB" });

    const filepath = `./public/images/${merks.image}`;

    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });
  }

  const name = req.body.name;

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  await Merk.update(
    {
      name: name,
      image: fileName,
      url: url,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json({ message: "data udah terganti" });
};

export const deleteMerk = async (req, res) => {
  const { id } = req.params;
  const merks = await Merk.findOne({
    where: {
      id: id,
    },
  });
  if (!merks) return res.status(404).json({ message: "Not Found" });

  try {
    const filepath = `./public/images/${merks.image}`;
    fs.unlinkSync(filepath);
    await Merk.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Merk Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};