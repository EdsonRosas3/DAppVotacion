import React,{useEffect} from "react";
import { Card, Checkbox } from "antd";
import { electionService } from "../services";
//import ContractVotes from "../assets/contractVotes.json";

const Candidate = ({ candidate, electionInfo }) => {
  const { Meta } = Card;

  const voteNow = (e) => {
    //const res = await electionService.voteNow(electionInfo.data.id,candidate.id);
    console.log("Vote");
  }

  useEffect(() => {
    console.log(electionInfo.data.id);
  }, [electionInfo]);
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
      <Meta
        title={candidate.postulant.nameFront}
        description={candidate.postulant.description}
      />
      {electionInfo.election ? (
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
