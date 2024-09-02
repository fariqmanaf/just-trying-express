const prisma = require("../../db")
const asyncHandler = require("../../utils/handler/asyncHandler")
const validator = require("validator");

const registerValidator = asyncHandler (async(req, res, next) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please provide name, email, and password");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  }

  if (password.length < 5) {
    throw new Error("Password must be at least 5 characters");
  }

  if (name.length < 5) {
    throw new Error("Name must be at least 5 characters");
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    throw new Error("User already exist");
  }

  next();
});

const loginValidator = asyncHandler (async(req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  }

  next();
});

module.exports = { registerValidator, loginValidator };