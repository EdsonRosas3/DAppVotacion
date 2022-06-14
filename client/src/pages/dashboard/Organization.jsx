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

  const [listResults,setListResults] = useState({});



  const updateListUsers = () => {
    setUpdateListUser(!updateListUser);
  };
  const generarPdf = () => {
   
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
      } catch (error) {
        message.error("Ocurrio un error");
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await electionService.allCandidates(Number(idOrganization));
        setListResults(res.data);
      } catch (error) {   
        message.error("Ocurrio un error");
      }
    }; 
    fetch();
    
  }, []);
  
  return (
    <div >
      <Link to="/auth/dashboard">Volver a organizaciones</Link>
      <Title level={3}>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            {data.name}
          </Col>
          <Col className="gutter-row" span={4}>
            
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
      {(listResults.exit)?
      <div>
          <Row gutter={16} >
            <Col className="gutter-row" span={8}>
            </Col>
            <Col className="gutter-row" span={10}>
              <Title level={2} >REPORTE ESTADISTICO</Title>
            </Col>
            <Col className="gutter-row" span={3}>
              <GeneratePDF data={data} listResults={listResults}/>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" span={5}>
              <b>{"Fecha de inicio: "}</b>
              {new Date(listResults.election.postulation_StartDate).toLocaleDateString()}
            </Col>
            <Col className="gutter-row" span={5}>
              <b>{"Fecha de fin: "}</b>
              {new Date(listResults.election.postulation_EndDate).toLocaleDateString()}
            </Col>
            <Col className="gutter-row" span={6}>
              <b>{"Dia de votacion: "}</b>
              {new Date(listResults.election.date).toLocaleDateString()}
            </Col>
        </Row>
        
        <Row gutter={16}>
            <Col className="gutter-row" span={5}>
              <b>{"Total de votos: "}</b>
              {listResults.election.votesCast}
            </Col>
            <Col className="gutter-row" span={5}>
              <b>{"Votos habiles: "}</b>
              {listResults.election.votesCast-listResults.election.absentVotes}
            </Col>
            <Col className="gutter-row" span={6}>
              <b>{"Votos nulos: "}</b>
              {listResults.election.absentVotes}
            </Col>
        </Row>
        <div id = "graph">
          <Row gutter={16} id="ShowTable">
              <Col className="gutter-row" span={2}>
              </Col>
              <Col className="gutter-row" span={10}>
                <Title level={3} >Grafica de barras</Title>
              </Col>
              <Col className="gutter-row" span={4}>
              </Col>
          </Row>
          <Row gutter={16} id="ShowTable">
              <Col className="gutter-row" span={4}>
              </Col>
              <Col className="gutter-row" span={16}>
                <ShowTable listCandidates={listResults.candidates} />
              </Col>
              <Col className="gutter-row" span={4}>
              </Col>
          </Row>
          <Row gutter={16} id="ShowTable">
              <Col className="gutter-row" span={2}>
              </Col>
              <Col className="gutter-row" span={10}>
                <Title level={3} >Grafica de columna</Title>
              </Col>
              <Col className="gutter-row" span={4}>
              </Col>
          </Row>
          <Row gutter={16} >
              <Col className="gutter-row" span={4}>
              </Col>
              <Col className="gutter-row" span={16}>
                <ShowGraph listCandidates={listResults.candidates}/>
              </Col>
              <Col className="gutter-row" span={4}>
              </Col>
          </Row>
          <Row gutter={16} id="ShowTable">
              <Col className="gutter-row" span={2}>
              </Col>
              <Col className="gutter-row" span={10}>
                <Title level={3} >Grafica por sectores</Title>
              </Col>
              <Col className="gutter-row" span={4}>
              </Col>
          </Row>
          <Row gutter={16} >
              <Col className="gutter-row" span={4}>
              </Col>
              <Col className="gutter-row" span={16}>
                <ShowPie listCandidates={listResults.candidates} votesCast={listResults.election.votesCast} />
              </Col>
              <Col className="gutter-row" span={4}>
              </Col>
          </Row>
        </div>
      </div>
      :
      <div>
        <Title level={3} >La eleccion no ha finalizado</Title>
      </div>
      }
    </div>
  );
};

export default OrganizationOne;
