/** saber si la fecha de hoy esta en el intervalo de dos fechas */
function isBetween(fecha, fechaInicio, fechaFin) {
  return (
    fecha.getTime() >= fechaInicio.getTime() &&
    fecha.getTime() <= fechaFin.getTime()
  );
}
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

console.log(
  "test 1 esperado: postulacion =>",
  getStatusElection(
    new Date(2020, 5, 1),
    new Date(2022, 1, 15),
    new Date(2022, 2, 18)
  )
);
console.log(
  "test 1 esperado: espera =>",
  getStatusElection(
    new Date(2022, 5, 15),
    new Date(2022, 5, 20),
    new Date(2022, 5, 25)
  )
);
console.log(
  "test 1 esperado: espera =>",
  getStatusElection(
    new Date(2022, 5, 5),
    new Date(2022, 5, 11),
    new Date(2022, 5, 25)
  )
);

console.log(
  "test 1 esperado: votacion =>",
  getStatusElection(
    new Date(2022, 5, 5),
    new Date(2022, 5, 11),
    new Date(2022, 5, 13)
  )
);
