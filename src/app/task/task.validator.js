const asyncHandler = require("../../utils/handler/asyncHandler");

const taskValidator = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if(!name || !description) {
    return res.status(400).json({ message: "Name and description are required" });
  }

  next();
});

module.exports = taskValidator;