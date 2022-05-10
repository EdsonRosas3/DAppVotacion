const Role = require('./Role');
const User = require('./User');
const Organization = require('./Organization');

Role.belongsToMany(User,{through: "user_role"});
User.belongsToMany(Role,{through: "user_role"});

Organization.belongsToMany(User,{through: "user_org"});
User.belongsToMany(Organization,{through: "user_org"});