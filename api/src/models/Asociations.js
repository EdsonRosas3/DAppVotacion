const Role = require('./Role');
const User = require('./User');
const Organization = require('./Organization');
const Election = require('./Election');
const Postulant = require('./Postulant');

Role.belongsToMany(User,{through: "user_role"});
User.belongsToMany(Role,{through: "user_role"});

Organization.belongsToMany(User,{through: "user_organization"});
User.belongsToMany(Organization,{through: "user_organization"});

Election.belongsToMany(User,{through: Postulant});
User.belongsToMany(Election,{through: Postulant});

Election.belongsToMany(User,{through: "member_accept"});
User.belongsToMany(Election,{through: "member_accept"});