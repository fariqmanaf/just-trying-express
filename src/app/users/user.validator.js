const asyncHandler = require("../../utils/handler/asyncHandler");
const prisma = require("../../db");
const validator = require("validator");

const updateUserValidator = asyncHandler(async (req, res, next) => {

  const { name, email } = req.body; 

  if (!name || !email) {
    throw new Error("Please provide name and email");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  }

  next();
});

module.exports = {updateUserValidator};