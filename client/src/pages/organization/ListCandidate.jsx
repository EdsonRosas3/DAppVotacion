import React, { useEffect, useState } from "react";
import { Row, Col, Card, Checkbox, Typography } from "antd";
import { electionService } from "../../services";
import Candidate from "../../components/Candidate";
const { Title } = Typography;
const ListPostulante = ({ electionInfo, updateListCandidates }) => {
  const [candidates, setCandidates] = useState([]);

  const toggleDisable = (e, item) => {
    console.log(e.target.checked, item);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (electionInfo.data !== null) {
        
        const res = await electionService.allCandidates(electionInfo.data.id);
        console.log(res)
        //setCandidates(res.data.users);
      }
    };
    fetchData();
  }, [electionInfo, updateListCandidates]);
  return (
    <>
      <Title level={5}>Lista de candidatos:</Title>
      <Row
        style={{ background: "#ececec", padding: "10px 0" }}
        justify="space-around"
      >
        {candidates.map((item) => (
          <Col
            style={{ padding: "10px" }}
            xs={20}
            sm={14}
            md={12}
            lg={8}
            xl={4}
          >
            <Candidate candidate={item} electionInfo={electionInfo} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ListPostulante;
