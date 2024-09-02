const prisma = require("../../db");

const getListUsersRepo = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      photo: true
    }
  });
  
  return users;
};

const getUserByIdRepo = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    }
  });
  return user;
}

const updateUserRepo = async (id, name, email, photo) => {
  
  const updatedUser =  prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      email,
      photo,
    },
  });

  return updatedUser;
};

const deleteUserRepo = async (id) => {
  const deletedUser = prisma.user.delete({
    where: {
      id: parseInt(id)
    }
  });

  return deletedUser;
};

module.exports = {
  getListUsersRepo,
  getUserByIdRepo,
  updateUserRepo,
  deleteUserRepo
};