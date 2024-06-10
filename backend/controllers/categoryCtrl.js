const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and type are required for creating a category");
    }
    //convert the name to lowercase
    const normalizedName = name.toLowerCase();
    //!check if the type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type" + type);
    }
    //!check if the category already exists on the user
    const categoryExists = await Category.findOne({
      user: req.user,
      name: normalizedName,
    });
    if (categoryExists) {
      return res.send({ message: "Category already exists" });
    }
    //!create the category
    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json(category);
  }),

  //!Lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),

  //!update
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, type } = req.body;
    const normalizedName = name.toLowerCase();
    // const category = await Category.findById(categoryId);
    const category = await Category.findById(categoryId);
    if (!category && category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or user not authorized");
    }
    const oldName = category.name;
    //update category properties
    category.name = name;
    category.type = type;
    const updatedCategory = await category.save();
    //updated affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        { $set: { category: updatedCategory.name } }
      );
    }
    res.json(updatedCategory);
  }),
  //delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && category.user.toString() === req.user.toString()) {
      //!update transactions that have this category
      const defaultCategory = "Uncategorized";

      await Transaction.updateMany(
        { user: req.user, category: category.name },
        { $set: { category: defaultCategory } }
      );
      //remove category
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category removed and transactions updated" });
    } else {
      res.json({ message: "Category not found or user not authorized" });
    }
  }),
};

module.exports = categoryController;
