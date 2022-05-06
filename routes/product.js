const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// @route   GET api/product
// @desc    get all product
// @access  private
// @query   userEmail,club,skip,limit
router.get("/", async (req, res) => {
  try {
    let { userEmail, skip, limit } = req.query;
    skip = Number(skip);
    limit = Number(limit);
    function matchQuery() {
      if (userEmail) {
        return {
          userEmail: userEmail,
        };
      } else {
        return {};
      }
    }
    const product = await ProductModel.aggregate()
      .match(matchQuery())
      .skip(skip ? skip : 0)
      .limit(limit ? limit : 20);

    res.status(200).send(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, masssage: "no posts" });
  }
});

// @route   GET api/product/one
// @desc    get one product by product id
// @access  Private
// @query   productId
router.get("/one", async (req, res) => {
  try {
    let { productId } = req.query;
    let postObjId = mongoose.Types.ObjectId(productId);
    function matchQuery() {
      if (productId) {
        return {
          _id: postObjId,
        };
      } else {
      }
    }
    const product = await ProductModel.aggregate().match(matchQuery()).limit(1);
    res.status(200).send(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, masssage: "no posts" });
  }
});

// @route   POST api/product
// @desc    create/add one new product
// @access  Private
router.post("/", async (req, res) => {
  let product = new ProductModel({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    userEmail: req.body.userEmail,
  });
  console.log(product);
  try {
    product = await product.save();
    res.send({ success: true, message: "product created" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: "product cannot be created" });
  }
});

// @route   DELETE api/product/one
// @desc    delete one product
// @access  Private
router.delete("/one", async (req, res) => {
  try {
    let { productId } = req.query;
    const product = await ProductModel.findByIdAndDelete({ _id: productId });
    if(!product) throw error
    res.status(200).send({ success: true, message: "product deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "product cannot be deleted" });
  }
});

module.exports = router;
