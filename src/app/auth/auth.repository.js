const prisma = require("../../db")
  
const registerRepo = async (name, email, hashedPassword) => {
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return newUser;
};

const loginRepo = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

module.exports = { registerRepo, loginRepo };