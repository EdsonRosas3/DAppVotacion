const Role = require("../models/Role");
const { encryptPassword } = require("../utils");

const createUsers = async () => {
  let lenth = await Role.count();
  if (lenth < 1) {
    await Role.create(
      {
        name: "user",
        users: [
          {
            name: "Tom",
            last_name: "Jerry",
            username: "user",
            email: "user@user.com",
            password: await encryptPassword("user"),
          },
          {
            name: "Tomas",
            last_name: "Frias",
            username: "tomas",
            email: "tomas@user.com",
            password: await encryptPassword("tomas"),
          },
          {
            name: "Juan",
            last_name: "Terrazas",
            username: "juan",
            email: "juan@user.com",
            password: await encryptPassword("juan"),
          },
          {
            name: "Edson",
            last_name: "Rosas",
            username: "edsonrosas",
            email: "edsonrosas@user.com",
            password: await encryptPassword("edsonrosas"),
          },
          {
            name: "Shirley",
            last_name: "Quelali",
            username: "shirleyquelali",
            email: "shirleyquelali@user.com",
            password: await encryptPassword("shirleyquelali"),
          },
          {
            name: "Denisse",
            last_name: "Vargas",
            username: "denissevargas",
            email: "denissevargas@user.com",
            password: await encryptPassword("denissevargas"),
          },
          {
            name: "Antonio",
            last_name: "Roman",
            username: "antonioroman",
            email: "antonioroman@user.com",
            password: await encryptPassword("antonioroman"),
          },
        ],
      },
      {
        include: "users",
      }
    );
  }
};

module.exports = {createUsers}
