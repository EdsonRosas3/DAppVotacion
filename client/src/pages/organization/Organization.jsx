import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ListUsers from "./ListUsers";
import AddUser from "./Actions/AddUser";
import InitialChoice from "./Actions/InitialChoice";
import Postulate from "./Actions/Postulate";
import { Row, Col, message, Typography, Card, Button } from "antd";
import ListCandidate from "./ListCandidate";
import { useParams } from "react-router-dom";
import { organizationService, electionService } from "../../services";
import UserContext from "../../context/user/UserContext";

const { Title, Text } = Typography;
const OrganizationOne = () => {
  const [data, setData] = useState({});
  const { idOrganization } = useParams();
  const { user } = useContext(UserContext);
  const [electionInfo, setElectionInfo] = useState({
    election: null,
    message: "",
    status: "",
  });
  const [updateListUser, setUpdateListUser] = useState(false);
  const [updateOrganization, setUpdateOrganization] = useState(false);
  const [showAcceptElecction, setShowAcceptElecction] = useState(false);
  const updateListUsers = () => {
    setUpdateListUser(!updateListUser);
  };

  const updateOrganizationEvent = () => {
    setUpdateOrganization(!updateOrganization);
  };
  const verifyAccepted = async () => {
    try {
      const res = await electionService.verifyUserAcceptElection(
        user.id,
        idOrganization
      );
      if (res.data.status === false) {
        setShowAcceptElecction(true);
      }else{
        setShowAcceptElecction(false)
      }
    } catch (error) {}
  };
  const acepatarElection = async () => {
    try {
      await electionService.userAcceptElection(user.id, idOrganization);
      message.success("Has aceptado la elección");
      setUpdateOrganization(!updateOrganization);
      setShowAcceptElecction(false)
    } catch (error) {
      message.error("No se pudo aceptar la elección");
    }
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await organizationService.getUsers(idOrganization);
        setData(res.data);
        const informationElection = await electionService.infoElection(
          idOrganization
        );
        setElectionInfo(informationElection.data);
        if (
          informationElection.data.status === "VOTACION" ||
          informationElection.data.status === "POSTULACION" ||
          informationElection.data.status === "ESPERA"
        ) {
          verifyAccepted();
        }
      } catch (error) {
        message.error("Ocurrio un error");
      }
    };
    fetch();
  }, [updateOrganization, idOrganization]);
  return (
    <div>
      <Link to="/auth/organizations">Volver a organizaciones</Link>

      <Title level={3}>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            {data.name}
          </Col>
          <Col className="gutter-row" span={4}>
            <AddUser
              electionInfo={electionInfo}
              updateListUsers={updateListUsers}
              updateOrganizationEvent={updateOrganizationEvent}
            />
          </Col>
          <Col className="gutter-row" span={4}>
            <InitialChoice
              electionInfo={electionInfo}
              updateOrganizationEvent={updateOrganizationEvent}
            />
          </Col>
          <Col className="gutter-row" span={4}>
            <Postulate
              typeOrganization = {data.type}
              electionInfo={electionInfo}
              updateOrganizationEvent={updateOrganizationEvent}
              userId={user.id}
            />
          </Col>
        </Row>
      </Title>
      <Link to={""}>
        {" "}
        {data.reach} - {data.type}{" "}
      </Link>
      <Text type="secondary">{data.description}</Text>
      <br />

      {electionInfo.election &&
      electionInfo.status !== "FINALIZADA" &&
      electionInfo.status !== "DESAPROBADO" ? (
        <Card bordered={true}>
          <Text type="warning">{electionInfo.message}</Text>
          <p>
            Fecha de postulación:{" "}
            {new Date(
              electionInfo.election.postulation_StartDate
            ).toLocaleDateString() +
              " - " +
              new Date(
                electionInfo.election.postulation_EndDate
              ).toLocaleDateString()}
          </p>
          <p>
            Fecha de votación:{" "}
            {new Date(electionInfo.election.date).toLocaleDateString()}
          </p>
          {showAcceptElecction && data.type === "DESCENTRALIZADA"?(
            <Button onClick={acepatarElection} type="danger">
              Aceptar elección
            </Button>
          ):""}
        </Card>
      ) : (
        ""
      )}

      {electionInfo.status === "POSTULACION" ||
      electionInfo.status === "VOTACION" ||
      electionInfo.status === "ESPERA" ? (
        <ListCandidate electionInfo={electionInfo} userId={user.id} updateOrganizationEvent={updateOrganizationEvent} />
      ) : (
        ""
      )}

      <ListUsers updateListUser={updateListUser} />
    </div>
  );
};

export default OrganizationOne;
