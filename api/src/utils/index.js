const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
  
const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

const getStatusElection = (date_startPostulation, date_endPostulation, dateElection) => {
    let nowDate = new Date();
    let dayNow = nowDate.getUTCDate();
    let monthNow = nowDate.getMonth();
    let yearNow = nowDate.getFullYear();

    let dayElection = dateElection.getUTCDate();
    let monthElection = dateElection.getMonth();
    let yearElection = dateElection.getFullYear();

    let dayStartP = date_startPostulation.getUTCDate();
    let monthStartP = date_startPostulation.getMonth();
    let yearStartP = date_startPostulation.getFullYear();

    let dayEndP = date_endPostulation.getUTCDate();
    let monthEndP = date_endPostulation.getMonth();
    let yearEndP = date_endPostulation.getFullYear();
/** saber si fech a se encuentra en intervalo de fechas */
if(yearNow == yearElection && monthNow == monthElection && dayNow == dayElection){    
/**if(yearStartP >= yearNow && yearNow <= yearEndP){
        if(monthStartP >= monthNow && monthNow <= monthEndP){
            if()
        }
    }*/
}

module.exports = {
    encryptPassword,
    comparePassword
}