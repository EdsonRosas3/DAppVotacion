import React, { useEffect, useState } from "react";
import { Row, Col, Card, Checkbox, Typography } from "antd";
import { electionService } from "../../services";
const { Title } = Typography;
const ListPostulante = ({ electionInfo, updateListCandidates }) => {
  const { Meta } = Card;
  const [candidates, setCandidates] = useState([]);

  const toggleDisable = (e, item) => {
    console.log(e.target.checked, item);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (electionInfo.data !== null) {
        console.log(electionInfo);
        const res = await electionService.allCandidates(electionInfo.data.id);
        setCandidates(res.data.users);
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
            <Card
              style={{ width: "100%", height: "100%" }}
              cover={
                <img
                  alt="example"
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWm7kgMH1PEsycRwkyqPcPB1b2NITpD8j2g&usqp=CAU"
                  }
                />
              }
            >
              <Meta
                //avatar={<Avatar icon={<UserOutlined />} />}
                title={item.postulant.nameFront}
                description={item.postulant.description}
              />
              {electionInfo.election ? (
                <div style={{ textAlign: "center" }}>
                  <Checkbox
                    onChange={(e) => {
                      toggleDisable(e, item);
                    }}
                  ></Checkbox>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Checkbox disabled={true} />
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ListPostulante;
