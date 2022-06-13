const Role = require("../models/Role");
const Organization = require("../models/Organization");
const Election = require("../models/Election");
const Postulant = require("../models/Postulant");
const User = require("../models/User");
const { encryptPassword } = require("../utils");
const { faker } = require("@faker-js/faker/locale/es_MX");

const main = async () => {
  await createOrganizations();
  await createUsers();
  await relationUsersOrg();
  await createElections();
  await createPostulations();
};
const createPostulations = async () => {
  let lenth = await Postulant.count();
  if (lenth > 0) {
    return;
  }
  let postulants = [
    {
      nameFront: "MCD Cochabamaba",
      description: "Montevideo Capital de Desarrollo",
      votesReceived: 100,
      electionId: 3,
      userId: 2,
    },
    {
      nameFront: "Todos somos CBBA",
      description: "Todos somos Cochabamba",
      votesReceived: 50,
      electionId: 3,
      userId: 4,
    },
    {
      nameFront: "CBBA - Capital",
      description: "La Capital Cochabamba unidad",
      votesReceived: 98,
      electionId: 3,
      userId: 100,
    },
    {
      nameFront: "CPDA - Cochalos",
      description: "Cochalos de corazon fuerza Desarrollo",
      votesReceived: 52,
      electionId: 3,
      userId: 10,
    },
    {
      nameFront: "MCD Cochabamaba",
      description: "Montevideo Capital de Desarrollo",
      votesReceived: 100,
      electionId: 1,
      userId: 2,
    },
    {
      nameFront: "Todos somos CBBA",
      description: "Todos somos Cochabamba",
      votesReceived: 50,
      electionId: 1,
      userId: 3,
    },
    {
      nameFront: "CBBA - Capital",
      description: "La Capital Cochabamba unidad",
      votesReceived: 98,
      electionId: 1,
      userId: 100,
    },
    {
      nameFront: "CPDA - Cochalos",
      description: "Cochalos de corazon fuerza Desarrollo",
      votesReceived: 52,
      electionId: 1,
      userId: 10,
    },
  ];
  Postulant.bulkCreate(postulants).then(() => {
    console.log("Postulants created");
  }).catch((err) => {
    console.log(err.message);
  })
};
const createElections = async () => {
  let lenth = await Election.count();
  if (lenth > 0) {
    return;
  }
  let elections = [
    {
      postulation_StartDate: "2022-05-01",
      postulation_EndDate: "2022-05-30",
      date: "2022-06-11",
      votesCast: 0,
      absentVotes: 0,
      organization_id: 2,
    },
    {
      postulation_StartDate: "2022-06-11",
      postulation_EndDate: "2022-06-31",
      date: "2022-07-01",
      votesCast: 0,
      absentVotes: 0,
      organization_id: 3,
    },
    {
      postulation_StartDate: "2021-10-01",
      postulation_EndDate: "2021-10-31",
      date: "2021-11-01",
      votesCast: 300,
      absentVotes: 6,
      statusAccept: true,
      organization_id: 4,
    },
  ];
  Election.bulkCreate(elections)
    .then(() => {
      console.log("Election created");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
const relationUsersOrg = async () => {
  const org = await Organization.findByPk(1);
  for (let index = 1; index <= 100; index++) {
    org.addUser(index);
  }

  const org2 = await Organization.findByPk(2);
  for (let index = 80; index <= 200; index++) {
    org2.addUser(index);
  }
  org2.addUser(4);

  const org3 = await Organization.findByPk(3);
  for (let index = 150; index <= 250; index++) {
    org3.addUser(index);
  }
  org3.addUser(4);

  const org4 = await Organization.findByPk(4);
  for (let index = 1; index <= 307; index++) {
    org4.addUser(index);
  }
};
const createOrganizations = async () => {
  let lenth = await Organization.count();
  if (lenth < 1) {
    let organizations = [
      {
        name: "Ingeniería en Sistemas",
        description: "Grupo electoral de la Universidad Mayor de San Simón",
        reach: "Institucional",
        type: "Descentralizada",
        creatorUserId: 1,
      },
      {
        name: "OTB - Organización de Trabajo de Bienestar",
        description:
          "Elecciones de representantes de la organización de trabajo de bienestar",
        reach: "Vecinal",
        type: "Centralizada",
        creatorUserId: 2,
      },
      {
        name: "Padres de Familia",
        description: "Colegio Julio Guardia Sandoval - 5to de secundaria B",
        reach: "Municipal",
        type: "Centralizada",
        creatorUserId: 3,
      },
      {
        name: "Eleccion de Gobernador CBBA",
        description: "Elecciones de gobernador del departamento de Cochabamba",
        reach: "Departamental",
        type: "Descentralizada",
        creatorUserId: 4,
      },
    ];
    Organization.bulkCreate(organizations)
      .then(() => {
        console.log("Organizations created");
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

const createUsers = async () => {
  let lenth = await Role.count();
  if (lenth < 1) {
    let users = [
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
    ];
    for (let index = 0; index < 350; index++) {
      let username = faker.internet.userName();
      users.push({
        name: faker.name.findName(),
        last_name: faker.name.lastName(),
        username,
        email: faker.internet.email(),
        password: await encryptPassword(username),
      });
    }

    await Role.create(
      {
        name: "user",
        users: users,
      },
      {
        include: "users",
      }
    )
      .then(() => {
        console.log("Users created");
        users = [];
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

module.exports = { main };
