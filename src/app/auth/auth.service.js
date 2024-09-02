const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../../utils/handler/asyncHandler");
const { registerRepo, loginRepo } = require("./auth.repository");

const setCookie = (res, id) => {

  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  const isDev = process.env.NODE_ENV !== "development";

  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isDev,
  };

  res.cookie("jwt", token, cookieOptions);

};

const registerService = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await registerRepo(name, email, hashedPassword);

  setCookie(res, newUser.id);

  newUser.password = undefined;
  newUser.photo = undefined;

  res.status(201).json({
    message: "User registered successfully",
    data: newUser,
  });
  
});

const loginService = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await loginRepo(email);

  if (user && (bcrypt.compare(password, user.password))) {

    setCookie(res, user.id);

    user.password = undefined;
    user.photo = undefined;

    res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });

  } else {
    throw new Error("Invalid credentials");
  }

});

const logoutService = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "User logged out successfully",
  });
});

module.exports = { registerService, loginService, logoutService };