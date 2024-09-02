const asyncHandler = require("../../utils/handler/asyncHandler");

const projectValidator = asyncHandler(async(req, res, next) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    if (name.length < 5) {
        return res.status(400).json({ message: "Name must be at least 5 characters" });
    }

    next();
});

module.exports = {
  projectValidator,

};