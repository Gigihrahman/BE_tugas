import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";
import { jwtDecode } from "jwt-decode";
import User from "../models/userModel.js";

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1; // Get page number from request query or default to 1
    const limit = parseInt(req.body.limit) || 10; // Get page size or default to 10
    const offset = (page - 1) * limit;

    const hasil = await Product.findAll({ limit, offset });
    const totalProduk = await Product.count();

    //modify data const data = hasil.map((produk) => {
    //   return {
    //     namanya: produk.name, // Akses properti 'user' dari setiap objek produk
    //     id: produk.id, // Akses properti 'id' dari setiap objek produk
    //   };
    // });

    // console.log(data)
    res.json({
      hasil,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalCount: totalProduk,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveProduct = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const price = req.body.price;
  const desc = req.body.desc;
  const berat = req.body.berat;
  const file = req.files.file;
  const merk = req.body.merk;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Product.create({
        name: name,
        image: fileName,
        price: price,
        description: desc,
        berat: berat,
        merk: merk,
        url: url,
      });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;

    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const price = req.body.price;
  const desc = req.body.desc;
  const berat = req.body.berat;
  const merk = req.body.merk;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Product.update(
      {
        name: name,
        price: price,
        description: desc,
        berat: berat,
        merk: merk,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductBycategori = async (req, res) => {
  try {
    const category = req.body.category;
    const page = parseInt(req.body.page) || 1; // Get page number from request query or default to 1
    const limit = parseInt(req.body.limit) || 10; // Get page size or default to 10
    const offset = (page - 1) * limit;

    const hasil = await Product.findAll({
      where: {
        categoty: category,
      },
      limit,
      offset,
    });
    const totalProduk = await Product.count();
  } catch (error) {
    console.log(error);
  }
};

export const getProductCart = async (req, res) => {
  try {
    const carts = req.body.cart || [];

    const productId = carts.map((data) => data.id);

    const product = await Product.findAll({ where: { id: productId } });
    console.log(product);
    res.status(200).json({ product: product });
  } catch (error) {
    console.log(error);
  }
};



    
    
    
