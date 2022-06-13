const Election = require("../models/Election");
const Organization = require("../models/Organization");
const Postulant = require("../models/Postulant");
const User = require("../models/User");
const { getStatusElection } = require("../utils");

const createElection = async (req, res) => {
  try {
    const { postulation_StartDate, postulation_EndDate, date } = req.body;
    const organization_id = req.params.idOrganization;
    const election = await Election.create({
      postulation_StartDate,
      postulation_EndDate,
      date,
      votesCast: 0,
      absentVotes: 0,
      status: getStatusElection(
        postulation_StartDate,
        postulation_EndDate,
        date
      ),
      organization_id,
    });
    return res.status(201).json(election);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const existElections = async (req, res) => {
  try {
    let nowDate = new Date();
    let dayNow = nowDate.getUTCDate();
    let monthNow = nowDate.getMonth();
    let yearNow = nowDate.getFullYear();

    const lastElection = await getLastElection(req.params.idOrganization);
    if (lastElection == null || lastElection == undefined)
      return res.status(200).json({
        message: "No hay elecciones pendientes",
        election: false,
        postulation: false,
        data: null,
      });

    let dateElection = lastElection.date;
    let dayElection = dateElection.getUTCDate();
    let monthElection = dateElection.getMonth();
    let yearElection = dateElection.getFullYear();

    let date_startPostulation = lastElection.postulation_StartDate;
    let dayStartP = date_startPostulation.getUTCDate();
    let monthStartP = date_startPostulation.getMonth();
    let yearStartP = date_startPostulation.getFullYear();

    let date_endPostulation = lastElection.postulation_EndDate;
    let dayEndP = date_endPostulation.getUTCDate();
    let monthEndP = date_endPostulation.getMonth();
    let yearEndP = date_endPostulation.getFullYear();

    if (
      dayNow >= dayStartP &&
      dayNow <= dayEndP &&
      monthNow >= monthStartP &&
      monthNow <= monthEndP &&
      yearNow >= yearStartP &&
      yearNow <= yearEndP
    ) {
      return res.status(200).json({
        message: "Es fase de postulacion de candidatos",
        election: false,
        postulation: true,
        data: lastElection,
      });
    } else {
      console.log(
        dayNow,
        dayElection,
        monthNow,
        monthElection,
        yearNow,
        yearElection
      );
      if (
        dayNow == dayElection &&
        monthNow == monthElection &&
        yearNow == yearElection
      ) {
        return res.status(200).json({
          message: "Hoy es la eleccion",
          election: true,
          postulation: false,
          data: lastElection,
        });
      } else {
        return res.status(200).json({
          message: "No es dia de eleccion y no es fase de postulacion",
          election: false,
          postulation: false,
          data: lastElection,
        });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
const existElectionsV2 = async (req, res) => {
  try {
    const lastElection = await getLastElection(req.params.idOrganization);
    if (lastElection == null || lastElection == undefined) {
      return res.status(200).json({
        type: "NO_EXISTE",
        message: "No hay elecciones pendientes",
        election: false,
        postulation: false,
        data: null,
      });
    }

    if (lastElection.status == "FINALIZADA") {
      return res.status(200).json({
        type: "FINALIZADA",
        message: "La eleccion ya ha finalizado",
        election:lastElection,
      });
    }
    let currentStatus = getStatusElection(
      lastElection.postulation_StartDate,
      lastElection.postulation_EndDate,
      lastElection.date
    )
    let message = getMessageByStatus(currentStatus);
    if (lastElection.status === currentStatus) {
      console.log("status: ", currentStatus);
      return res.status(200).json({
        type: lastElection.status,
        message,
        election: lastElection
      });
    }else{
      const newElection = await lastElection.update({status: currentStatus})
      message = getMessageByStatus(currentStatus);
      return res.status(200).json({type:newElection,message,election:newElection})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getMessageByStatus = (status) => {
  if (status === "POSTULACION") {
    return "Es fase de postulacion de candidatos";
  }
  if (status === "VOTACION") {
    return "Hoy es la eleccion";
  }
  if (status === "ESPERA") {
    return "No es dia de eleccion y no es fase de postulacion";
  }
  return "";
}
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

const getCandidatesByElection = async (req, res) => {
  try {
    const lastElection = await getLastElection(req.params.idOrganization);
    if (lastElection) {
      let idElection = lastElection.id;
      const candidates = await Postulant.findAll({
        where: { electionId: idElection },
      });

      return res
        .status(200)
        .json({ exit: true, election: lastElection, candidates });
    } else {
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateVotesElection = async (req, res) => {
  try {
    const { idElection } = req.params;
    const { votesCast, absentVotes } = req.body;

    const election = await Election.update(
      {
        votesCast,
        absentVotes,
      },
      {
        where: {
          id: idElection,
        },
      }
    );

    return res.status(201).json({
      message: "Se actualizo los votos realizados y los votos ausentes",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const isCadidateOfElection = async (req, res) => {
  try {
    const { idElection, idUser } = req.params;
    const isCadidate = await Postulant.findOne({
      where: { userId: idUser, electionId: idElection },
    });
    if (isCadidate) {
      return res
        .status(200)
        .json({ isCandidate: true, message: "Es candidato de la eleccion" });
    } else {
      return res.status(200).json({
        isCandidate: false,
        message: "No es candidato de la eleccion",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createElection,
  existElections,
  existElectionsV2,
  getCandidatesByElection,
  updateVotesElection,
  isCadidateOfElection,
};
