const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/User");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryCtrl = {
  //add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and Type are required to create a category");
    }
    const normalizeName = name.toLowerCase();
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("invalid category type" + type);
    }
    const categoryExists = await Category.findOne({
      name: normalizeName,
      user: req.user,
    });
    if (categoryExists) {
      throw new Error(`Category ${categoryExists.name} already exists`);
    }
    const category = await Category.create({
      name: normalizeName,
      user: req.user,
      type,
    });
    res.status(201).json(category);
  }),
  //lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(201).json(categories);
  }),

  //update
  update: asyncHandler(async (req, res) => {
    const categoryID = req.params.id;
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryID);
    if (!category && category.user.toString() !== req.user.toString()) {
      throw new TokenExpiredError("Category not found or user not authorized");
    }
    const oldName = category.name;
    //update categories
    category.name = name;
    category.type = type;
    const updatedCategory = await category.save();
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        {
          $set: { category: updatedCategory.name },
        }
      );
    }
    res.json(updatedCategory);
  }),
  //delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && category.user.toString() === req.user.toString()) {
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.user,
          category: category.name,
        },
        {
          $set: { category: defaultCategory },
        }
      );
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category deleted successfully" });
    }
  }),
};

module.exports = categoryCtrl;
