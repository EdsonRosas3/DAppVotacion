const bcrypt = require("bcryptjs");
const Election = require("../models/Election");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const getStatusElection = (
  date_startPostulation,
  date_endPostulation,
  dateElection
) => {
  date_startPostulation = new Date(date_startPostulation);
  date_endPostulation = new Date(date_endPostulation);
  dateElection = new Date(dateElection);
  let nowDate = new Date();
  const isPostulation = isBetween(
    nowDate,
    date_startPostulation,
    date_endPostulation
  );
  if (isPostulation) {
    return "POSTULACION";
  }
  const isEsperaBefore = isBetween(nowDate, nowDate, date_startPostulation);
  const isEsperaAfter = isBetween(nowDate, date_endPostulation, dateElection);
  if (isEsperaBefore || isEsperaAfter) {
    return "ESPERA";
  }

  if (
    nowDate.getFullYear() === dateElection.getFullYear() &&
    nowDate.getMonth() === dateElection.getMonth() &&
    nowDate.getDate() === dateElection.getDate()
  ) {
    return "VOTACION";
  }
  date_endPostulation = new Date(date_endPostulation);
  if(nowDate.getTime() > date_endPostulation.getTime()){
    return "DESAPROBADO";
  }
};

function isBetween(fecha, fechaInicio, fechaFin) {
  fecha = new Date(fecha);
  fechaInicio = new Date(fechaInicio);
  fechaFin = new Date(fechaFin);
  return (
    fecha.getTime() >= fechaInicio.getTime() &&
    fecha.getTime() <= fechaFin.getTime()
  );
};

const getLastElection = async (idOrganization) => {
  try {
    const elections = await Election.findAndCountAll({
      where: { organization_id: idOrganization },
    });
    if (elections.count >= 1) {
      let lastElection = elections.rows[elections.count - 1];
      return lastElection;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  encryptPassword,
  comparePassword,
  getStatusElection,
  getLastElection,
};
