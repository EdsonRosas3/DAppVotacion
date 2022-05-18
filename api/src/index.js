const app  = require("./app")
const db = require("./models")
const {initialSetup} = require("./libs");
const {config} = require("dotenv");
config();

db.sequelizeConected
  .sync({ force:true })
  .then(async () => {
    console.log("Base de datos sincornisado");
    await initialSetup.createUsers();
  })
  .catch((e) => {
    console.error("Error: ",e.message);
  });

app.listen(app.get("port"), () => {
  console.log("Aplicacion corriendo en:",`http://localhost:${app.get("port")}/`);
});


