/** saber si la fecha de hoy esta en el intervalo de dos fechas */
function isBetween(fecha, fechaInicio, fechaFin) {
    return (
        fecha.getTime() >= fechaInicio.getTime() &&
        fecha.getTime() <= fechaFin.getTime()
    );
    }
console.log(isBetween(new Date(2020,2,1), new Date(2020, 1, 1), new Date(2020, 2, 31)));