const {faker} = require("@faker-js/faker/locale/es_MX");

const randomName = faker.name.findName();
const randomEmail = faker.internet.email();

console.log(randomName);
console.log(randomEmail);
