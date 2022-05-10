const Role = require("../models/Role");
const { encryptPassword } = require("../utils");

const createUsers = async () => {
  let lenth = await Role.count();
  if (lenth < 1) {
    let user = await Role.create(
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
        ],
      },
      {
        include: "users",
      }
    );
  }
};

module.exports = {createUsers}
