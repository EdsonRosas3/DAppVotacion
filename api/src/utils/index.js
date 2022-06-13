const bcrypt = require("bcryptjs");

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
};

function isBetween(fecha, fechaInicio, fechaFin) {
  return (
    fecha.getTime() >= fechaInicio.getTime() &&
    fecha.getTime() <= fechaFin.getTime()
  );
}

module.exports = {
  encryptPassword,
  comparePassword,
  getStatusElection,
};
