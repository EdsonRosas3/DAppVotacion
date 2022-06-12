import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import ListUsers from "./ListUsers";
import ShowTable from "./ShowTable";
import ShowGraph from "./ShowGraph";
import ShowPie from "./ShowPie";
import GeneratePDF from "./GeneratePDF";
import { Row, Col, message,Typography } from "antd";
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

  const updateListUsers = () => {
    setUpdateListUser(!updateListUser);
  };
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await organizationService.getUsers(idOrganization);
        setData(res.data);
        const informationElection = await electionService.infoElection(
          idOrganization
        );
        
        setElectionInfo(informationElection.data);
      } catch (error) {
        message.error("Ocurrio un error");
      }
    };
    fetch();
  }, []);
  return (
    <div>
      <Link to="/auth/dashboard">Volver a organizaciones</Link>

      <Title level={3}>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            {data.name}
          </Col>
          <Col className="gutter-row" span={4}>
            <ShowTable />
          </Col>
          <Col className="gutter-row" span={4}>
            <ShowGraph />
          </Col>
          <Col className="gutter-row" span={4}>
            <ShowPie />
          </Col>
          <Col className="gutter-row" span={4}>
            <GeneratePDF />
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
      <ListUsers updateListUser={updateListUser} />
    </div>
  );
};

export default OrganizationOne;
