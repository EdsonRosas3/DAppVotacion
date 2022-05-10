const Role = require('./Role');
const User = require('./User');

Role.belongsToMany(User,{through: "user_role"});
User.belongsToMany(Role,{through: "user_role"});

