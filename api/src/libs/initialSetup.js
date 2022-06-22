const Role = require("../models/Role");
const Organization = require("../models/Organization");
const Election = require("../models/Election");
const Postulant = require("../models/Postulant");
const User = require("../models/User");
const { encryptPassword } = require("../utils");
const { faker } = require("@faker-js/faker/locale/es_MX");
const Participant = require("../models/Participant");

const main = async () => {
  await createOrganizations();
  await createUsers();
  await relationUsersOrg();
  await createElections();
  await createPostulations();
  await createParticipantes();
};
const createParticipantes = async () => {
  let lenth = await Participant.count();
  if (lenth > 0) {
    return;
  }

  for (let index = 1; index <= 10; index++) {
    let participant1 = await Participant.create({
      electionId: 1,
      userId: index,
    });
  }

  for (let index = 80; index <= 200; index++) {
    let participant2 = await Participant.create({
      electionId: 2,
      userId: index,
    });
  }
  for (let index = 2; index <= 3; index++) {
    let participant2 = await Participant.create({
      electionId: 2,
      userId: index,
    });
  }


  for (let index = 150; index <= 250; index++) {
    let participant3 = await Participant.create({
      electionId: 3,
      userId: index,
    });
  }
  for (let index = 2; index <= 4; index++) {
    let participant3 = await Participant.create({
      electionId: 3,
      userId: index,
    });
  }

  for (let index = 1; index <= 307; index++) {
    let participant4 = await Participant.create({
      electionId: 4,
      userId: index,
    });
  }
  for (let index = 1; index <= 200; index++) {
    let participant5 = await Participant.create({
      electionId: 5,
      userId: index,
    });
  }
  console.log("Participantes creados");
};
const createPostulations = async () => {
  let lenth = await Postulant.count();
  if (lenth > 0) {
    return;
  }
  let postulants = [
    {
      nameFront: "Todos mejores vecinos",
      description: "Montevideo de vecinos al exito",
      votesReceived: 0,
      electionId: 1,
      userId: 2,
    },
    {
      nameFront: "Sindicato mixto",
      description: "Conocemos la nesecidades de nuestra gente",
      votesReceived: 0,
      electionId: 1,
      userId: 9,
    },
    {
      nameFront: "Todos somos CBBA",
      description: "Todos somos Cochabamba",
      votesReceived: 0,
      electionId: 5,
      userId: 4,
    },
    {
      nameFront: "CBBA - Capital",
      description: "La Capital Cochabamba unidad",
      votesReceived: 0,
      electionId: 5,
      userId: 100,
    },
    {
      nameFront: "CPDA - Cochalos",
      description: "Cochalos de corazon fuerza Desarrollo",
      votesReceived: 0,
      electionId: 5,
      userId: 81,
    },
    {
      nameFront: "MCD Cochabamaba",
      description: "Montevideo Capital de Desarrollo",
      votesReceived: 100,
      electionId: 4,
      userId: 2,
    },
    {
      nameFront: "Todos somos CBBA",
      description: "Todos somos Cochabamba",
      votesReceived: 50,
      electionId: 4,
      userId: 3,
    },
    {
      nameFront: "CBBA - Capital",
      description: "La Capital Cochabamba unidad",
      votesReceived: 98,
      electionId: 4,
      userId: 100,
    },
    {
      nameFront: "CPDA - Cochalos",
      description: "Cochalos de corazon fuerza Desarrollo",
      votesReceived: 52,
      electionId: 4,
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
      postulation_StartDate: "2022-06-01T23:59:59.000Z",
      postulation_EndDate: "2022-06-12T23:59:59.000Z",
      date: "2022-06-22T23:59:59.000Z",
      votesCast: 10,
      absentVotes: 0,
      status: "VOTACION",
      statusAccept: true,
      organization_id: 1,
    },
    {
      postulation_StartDate: "2022-06-01T23:59:59.000Z",
      postulation_EndDate: "2022-06-30T23:59:59.000Z",
      date: "2022-07-11T23:59:59.000Z",
      votesCast: 0,
      absentVotes: 0,
      status: "POSTULACION",
      organization_id: 2,
    },
    {
      postulation_StartDate: "2022-07-11T23:59:59.000Z",
      postulation_EndDate: "2022-07-31T23:59:59.000Z",
      date: "2022-08-01T23:59:59.000Z",
      votesCast: 0,
      absentVotes: 0,
      status: "ESPERA",
      organization_id: 3,
    },
    {
      postulation_StartDate: "2021-10-01T23:59:59.000Z",
      postulation_EndDate: "2021-10-30T23:59:59.000Z",
      date: "2021-11-01T23:59:59.000Z",
      votesCast: 300,
      absentVotes: 6,
      status: "FINALIZADA",
      statusAccept: true,
      organization_id: 4,
    },
    {
      postulation_StartDate: "2022-06-08T23:59:59.000Z",
      postulation_EndDate: "2022-06-25T23:59:59.000Z",
      date: "2022-07-11T23:59:59.000Z",
      votesCast: 0,
      absentVotes: 0,
      statusAccept: true,
      status: "ESPERA",
      organization_id: 5,
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
  for (let index = 1; index <= 10; index++) {
    org.addUser(index);
  }

  const org2 = await Organization.findByPk(2);
  for (let index = 80; index <= 200; index++) {
    org2.addUser(index);
  }
  org2.addUser(2);
  org2.addUser(3);
  org2.addUser(4);

  const org3 = await Organization.findByPk(3);
  for (let index = 150; index <= 250; index++) {
    org3.addUser(index);
  }
  org3.addUser(2);
  org3.addUser(3);
  org3.addUser(4);

  const org4 = await Organization.findByPk(4);
  for (let index = 1; index <= 307; index++) {
    org4.addUser(index);
  }

  const org5 = await Organization.findByPk(5);
  for (let index = 1; index <= 200; index++) {
    org5.addUser(index);
  }

  const org6 = await Organization.findByPk(6);
  for (let index = 1; index <= 307; index++) {
    org6.addUser(index);
  }
};
const createOrganizations = async () => {
  let lenth = await Organization.count();
  if (lenth < 1) {
    let organizations = [
      {
        name: "Sindicato Qhopi",
        description: "Este es un grupo para elecciones de presidente",
        reach: "Vecinal",
        type: "CENTRALIZADA",
        creatorUserId: 1,
      },
      {
        name: "Ingeniería en Sistemas",
        description: "Grupo electoral de la Universidad Mayor de San Simón",
        reach: "Institucional",
        type: "DESCENTRALIZADA",
        creatorUserId: 2,
      },
      {
        name: "OTB - Organización de Trabajo de Bienestar",
        description:
          "Elecciones de representantes de la organización de trabajo de bienestar",
        reach: "Vecinal",
        type: "CENTRALIZADA",
        creatorUserId: 3,
      },
      {
        name: "Padres de Familia",
        description: "Colegio Julio Guardia Sandoval - 5to de secundaria B",
        reach: "Municipal",
        type: "CENTRALIZADA",
        creatorUserId: 4,
      },
      {
        name: "Elección de Gobernador CBBA",
        description: "Elecciones de gobernador del departamento de Cochabamba",
        reach: "Departamental",
        type: "DESCENTRALIZADA",
        creatorUserId: 5,
      },
      {
        name: "Federación de transporte CBBA",
        description: "Este es un grupo de transporte de Cochabamba para elecciones",
        reach: "Departamental",
        type: "DESCENTRALIZADA",
        creatorUserId: 6,
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
        console.log("error: ",e.message);
      });
  }
};

module.exports = { main };
