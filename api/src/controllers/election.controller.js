const Election = require("../models/Election");
const Organization = require("../models/Organization");
const Postulant = require("../models/Postulant");
const Participant = require("../models/Participant");
const User = require("../models/User");
const { getStatusElection, getLastElection } = require("../utils");

const createElection = async (req, res) => {
  try {
    let { postulation_StartDate, postulation_EndDate, date } = req.body;
    postulation_StartDate = postulation_StartDate+"T23:59:59.000Z";
    postulation_EndDate = postulation_EndDate+"T23:59:59.000Z";
    date = date+"T23:59:59.000Z";
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

    const organization = await Organization.findByPk(organization_id);
    let usersOrganization = await organization.getUsers();

    for (let i = 0; i < usersOrganization.length; i++) {
      let user = usersOrganization[i];
      let participant = await Participant.create({userId:user.id, electionId:election.id});
    };
    
    return res.status(201).json(election);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const existElectionsV2 = async (req, res) => {
  try {
    const updatePosibleElection = await getLastElection(req.params.idOrganization);
    const organization = await Organization.findByPk(req.params.idOrganization);

    if(organization.type == "CENTRALIZADA"){
      if (updatePosibleElection == null || updatePosibleElection == undefined) {
        return res.status(200).json({
          status: "NO_EXISTE",
          message: "No hay elecciones pendientes",
          election:updatePosibleElection
        });
      }
      if ( updatePosibleElection.statusAccept === false) {
        await updatePosibleElection.update({statusAccept:true});
      }
    }
    const lastElection = await getLastElection(req.params.idOrganization);

    if (lastElection == null || lastElection == undefined) {
      return res.status(200).json({
        status: "NO_EXISTE",
        message: "No hay elecciones pendientes",
        election:lastElection
      });
    }

    if (lastElection.status == "FINALIZADA") {
      return res.status(200).json({
        status: "FINALIZADA",
        message: "La elección ya ha finalizado",
        election:lastElection,
      });
    }

    


    if(organization.type == "CENTRALIZADA" || lastElection.statusAccept == true){
        let currentStatus = getStatusElection(
        lastElection.postulation_StartDate,
        lastElection.postulation_EndDate,
        lastElection.date
      )
     
      let message = getMessageByStatus(currentStatus);
      console.log("Stado: ",currentStatus);
      if (lastElection.status === currentStatus) {

        return res.status(200).json({
          status: lastElection.status,
          message,
          election: lastElection
        });
      }else{
        const newElection = await lastElection.update({status: currentStatus})
        message = getMessageByStatus(currentStatus);
        return res.status(200).json({type:newElection.status,message,election:newElection})
      }
    }
    else{
      let currentStatus = getStatusElection(
        lastElection.postulation_StartDate,
        lastElection.postulation_EndDate,
        lastElection.date
      )
      let message = "La eleccion no esta habilitada. "+getMessageByStatus(currentStatus);
      if (lastElection.status === currentStatus) {
        return res.status(200).json({
          status: lastElection.status,
          message,
          election: lastElection
        });
      }else{
        const newElection = await lastElection.update({status: currentStatus})
        return res.status(200).json({status:newElection.status,message,election:newElection})
      }
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getMessageByStatus = (status) => {
  if (status === "POSTULACION") {
    return "Es fase de postulación de candidatos";
  }
  if (status === "VOTACION") {
    return "Hoy es la elección";
  }
  if (status === "ESPERA") {
    return "Estamos en etapa de elección, pero no es dia de elección, ni etapa de postulación";
  }
  if (status === "DESAPROBAD0") {
    return "La elección no fue aprobada";
  }
  return "";
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
  existElectionsV2,
  getCandidatesByElection,
  updateVotesElection,
  isCadidateOfElection,
};
