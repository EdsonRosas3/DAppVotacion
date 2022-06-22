import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Button, message } from "antd";
import { electionService } from "../../services";
import Candidate from "../../components/Candidate";
import {ethers} from 'ethers'
import {useParams,useNavigate} from 'react-router-dom'
import ABI from "../../context/contract/VotesCotract.json";

const { Title, Text } = Typography;

const ListPostulante = ({ electionInfo, updateListCandidates,userId,updateOrganizationEvent }) => {
  const [candidates, setCandidates] = useState([]);
  const [disabledBtnVote, setDisabledBtnVote] = useState(true);
  let navigate = useNavigate();
  
  const {idOrganization} = useParams();

  const toggleDisable = () => {
    setDisabledBtnVote(true)
  };
  let contractAddress = '0x263ca502164a8D69df8adE929C0C6484Fae565D3';
	const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
		    updateEthers();
        contractAddress = result[0];
			})
			.catch(error => {
        message.error("Error al conectar con su billetera MetaMask")
			});

		} else {
			message.info("Necesita instalar MetaMask")
		}
	}
  
  const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		let tempSigner = tempProvider.getSigner();

		let tempContract = new ethers.Contract(contractAddress, ABI.abi, tempSigner);
		setContract(tempContract);	
	}

	const setHandler = async (idCadidato, idElection) => {
		
    try {
      const resContract = await contract.createVote(idCadidato,idElection);
      const res = await electionService.userVoteElection(userId,idOrganization,idCadidato)
      message.success("Su voto a sido registrado")
      updateOrganizationEvent()
    } catch (error) {
      
    }
	}


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (electionInfo.election !== null) {
          const res = await electionService.allCandidates(idOrganization);
          setCandidates(res.data.candidates);
          if(electionInfo.election.status === "VOTACION"){
            connectWalletHandler()
            const res2 = await electionService.verifyUserVoteElection(userId, idOrganization);
            if(res2.data.status === false){
              setDisabledBtnVote(false);
            }else{
              message.info("Usted voto en esta elección")
              setDisabledBtnVote(true);
            }
          }
        }
      } catch (error) {
        navigate("/organizations")
      }
    };
    fetchData();
  }, [electionInfo, updateListCandidates]);

  return (
    <>
      <Title level={5}>Lista de candidatos:</Title>
      {!disabledBtnVote && (<Text type="warning">Por favor emita su voto!</Text>)}
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
            <Candidate key={item.id} setHandler={setHandler} candidate={item} electionInfo={electionInfo} disabledBtnVote={disabledBtnVote} toggleDisable={toggleDisable} userId={userId} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ListPostulante;
