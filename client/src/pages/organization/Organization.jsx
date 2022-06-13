import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListUsers from "./ListUsers";
import AddUser from "./Actions/AddUser";
import InitialChoice from "./Actions/InitialChoice";
import Postulate from "./Actions/Postulate";
import { Row, Col, message, Typography } from "antd";
import ListCandidate from "./ListCandidate";
import { useParams } from "react-router-dom";
import { organizationService, electionService } from "../../services";

const { Title, Text } = Typography;
const OrganizationOne = () => {
  const [data, setData] = useState({});
  const { idOrganization } = useParams();
  const [electionInfo, setElectionInfo] = useState({
    data: null,
    election: false,
    message: "",
    postulation: false,
  });
  const [updateListUser, setUpdateListUser] = useState(false);
  const [updateOrganization, setUpdateOrganization] = useState(false);
  const updateListUsers = () => {
    setUpdateListUser(!updateListUser);
  };

  const updateOrganizationEvent = () => {
    setUpdateOrganization(!updateOrganization);
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await organizationService.getUsers(idOrganization);
        setData(res.data);
        const informationElection = await electionService.infoElection(
          idOrganization
        );
        console.log(informationElection);
        setElectionInfo(informationElection.data);
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
              electionInfo={electionInfo}
              updateOrganizationEvent={updateOrganizationEvent}
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
      <Text type="secondary">{electionInfo.message}</Text>

      {!(electionInfo.data === null) ||
      !(!electionInfo.election && !electionInfo.postulation) ? (
        <ListCandidate
          electionInfo={electionInfo}
        />
      ) : (
        ""
      )}

      <ListUsers updateListUser={updateListUser} />
    </div>
  );
};

export default OrganizationOne;
