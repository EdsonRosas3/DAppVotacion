const Role = require('./Role');
const User = require('./User');
const Organization = require('./Organization');
const Election = require('./Election');
const Postulant = require('./Postulant');
const Participant = require('./Participant');

Role.belongsToMany(User,{through: "users_roles"});
User.belongsToMany(Role,{through: "users_roles"});

Organization.belongsToMany(User,{through: "users_organizations"});
User.belongsToMany(Organization,{through: "users_organizations"});

Election.belongsToMany(User,{through: Postulant});
User.belongsToMany(Election,{through: Postulant});

Election.belongsToMany(User,{through: Participant});
User.belongsToMany(Election,{through: Participant});