import React, { useEffect, useContext } from "react";
import { Card, Checkbox } from "antd";
import { electionService } from "../services";
import { useParams } from "react-router-dom";
import ContractContext from "../context/contract/ContractContext";

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
  const { idOrganization } = useParams();
  const {contract} = useContext(ContractContext);
  const voteNow = async (e) => {
    setHandler(candidate.id+"", electionInfo.election.id+"");
  };

  useEffect(() => {
    console.log("TODO_CONTRACT: ",contract);
  }, [electionInfo,contract]);
  return (
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
      <Meta title={candidate.nameFront} description={candidate.description} />
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
