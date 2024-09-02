const asyncHandler = require("../../utils/handler/asyncHandler");
const fs = require("fs");
const path = require("path");

const { getListUsersRepo, getUserByIdRepo, updateUserRepo, deleteUserRepo } = require("./user.repository");

const deletePhoto = (photo) => {
  fs.unlinkSync(path.join(__dirname, "../../uploads", photo));
}

const getListUsersService = asyncHandler(async (req, res) => {
  const users = await getListUsersRepo();

  return res.status(200).json({
    success: true,
    data: users
  });
});

const getUserByIdService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await getUserByIdRepo(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  
  return res.status(200).json({
    success: true,
    data: user
  });
});

const updateUserService = asyncHandler(async(req, res) => {
  
  const id = req.params.id;
  const { name, email } = req.body;
  let photo = req.file ? req.file.filename : null;

  const user = await getUserByIdRepo(id);
  
  if (!user) {
    throw new Error("User not found");
  }  
  if (req.user.id !== user.id) {
    throw new Error("You are not authorized to perform this action");
  }

  if (photo && user.photo) {
    deletePhoto(user.photo);
  }

  const updatedUser = await updateUserRepo(id, name, email, photo);

  updatedUser.password = undefined;

  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
  });
});

const deleteUserByIdService = asyncHandler(async(req, res) => {
  const { id } = req.params;
  const user = await getUserByIdRepo(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (req.user.id !== user.id) {
    throw new Error("You are not authorized to perform this action");
  }

  const deletedUser = await deleteUserRepo(id);

  if (deletedUser.photo) {
    deletePhoto(deletedUser.photo);
  }

  res.clearCookie("jwt");

  res.status(200).json({
    message: "User deleted successfully",
  });
  
});

module.exports = {
  getListUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserByIdService
}