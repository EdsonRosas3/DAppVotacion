import React, { useEffect } from "react";
import { Card, Checkbox } from "antd";
import "./candidate.css"
const Candidate = ({
  candidate,
  electionInfo,
  userId,
  disabledBtnVote,
  toggleDisable,
  block,
  setHandler
}) => {
  const { Meta } = Card;

  const voteNow = (e) => {
    console.log(candidate)
    setHandler(candidate.userId+"", candidate.electionId+"");
  };

  useEffect(() => {

  }, [electionInfo]);
  return (
    <Card
      className="card-candidate"
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
      <Meta style={{whiteSpace:"normal"}} title={candidate.nameFront} description={candidate.description} />
      
      {!disabledBtnVote ? (
        <div style={{ textAlign: "center" }}>
          <Checkbox onChange={voteNow}></Checkbox>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Checkbox disabled={true} />
        </div>
      )}
    </Card>
  );
};

export default Candidate;
