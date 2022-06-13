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
  const [exist,setExist] = useState(true);
  const [dataTable,setDataTable] = useState([]);
  const [dataPie,setDataPie] = useState([]);

  const [listResults,setListResults] = useState({
      id: 3,
      postulation_StartDate: "2021-10-01T00:00:00.000Z",
      postulation_EndDate: "2021-10-31T00:00:00.000Z",
      date: "2021-11-01T00:00:00.000Z",
      votesCast: 300,
      absentVotes: 6,
      statusAccept: null,
      organization_id: 4,
      exist:true,
      users: [
        {
          nameFront:"Epson",
          description:"Partido del mas",
          totalVotes:150
        },
        {
          nameFront:"Comunismo",
          description:"Partido comunista",
          totalVotes:100
        },
      ],
    })


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

  const convertDataUsers = (users) => {
    const _data = {
      name: '',
      votes: 0,
    };
    for (const i in users) {
      _data.name  = users[i].nameFront;
      _data.votes = users[i].totalVotes;
      setDataTable(_data);
    }
    console.log(dataTable);
  };

  const convertDataUsersPie = (users,totalVotes) => {
    const _data = {
      name: '',
      percentage: 0,
    };
    for (const i in users) {
      _data.name  = users[i].nameFront;
      _data.percentage = (users[i].totalVotes*100)/totalVotes;
      setDataPie(_data);
    }
    console.log(dataPie);
  };


  return (
    <div>
      <Link to="/auth/dashboard">Volver a organizaciones</Link>
      <Title level={3}>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            {data.name}
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
      {(listResults.exist)?
      <div>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              
            </Col>
            <Col className="gutter-row" span={10}>
              <Title level={2} >REPORTE ESTADISTICO</Title>
            </Col>
            <Col className="gutter-row" span={3}>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" span={5}>
              <b>{"Fecha de inicio: "}</b>
              {new Date(listResults.postulation_StartDate).toLocaleDateString()}
            </Col>
            <Col className="gutter-row" span={5}>
              <b>{"Fecha de fin: "}</b>
              {new Date(listResults.postulation_EndDate).toLocaleDateString()}
            </Col>
            <Col className="gutter-row" span={6}>
              <b>{"Dia de votacion: "}</b>
              {new Date(listResults.date).toLocaleDateString()}
            </Col>
        </Row>
        {console.log(listResults.users)}
        <Row gutter={16}>
            <Col className="gutter-row" span={5}>
              <b>{"Total de votos: "}</b>
              {listResults.votesCast}
            </Col>
            <Col className="gutter-row" span={5}>
              <b>{"Votos habiles: "}</b>
              {listResults.votesCast-listResults.absentVotes}
            </Col>
            <Col className="gutter-row" span={6}>
              <b>{"Votos nulos: "}</b>
              {listResults.absentVotes}
            </Col>
        </Row>
        
        <Title level={3} >Grafica de barras</Title>
        <Row gutter={16}>
            <Col className="gutter-row" span={4}>
            </Col>
            <Col className="gutter-row" span={16}>
              <ShowTable />
            </Col>
            <Col className="gutter-row" span={4}>
            </Col>
        </Row>
        <Title level={3} >Grafica de columna</Title>
        <Row gutter={16}>
            <Col className="gutter-row" span={4}>
            </Col>
            <Col className="gutter-row" span={16}>
              <ShowGraph />
            </Col>
            <Col className="gutter-row" span={4}>
            </Col>
        </Row>
        <Title level={3} >Grafica por sectores</Title>
        <Row gutter={16}>
            <Col className="gutter-row" span={4}>
            </Col>
            <Col className="gutter-row" span={16}>
              <ShowPie />
            </Col>
            <Col className="gutter-row" span={4}>
            </Col>
        </Row>
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
