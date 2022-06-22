import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Typography, Button } from "antd";
import { electionService } from "../../services";
import Candidate from "../../components/Candidate";
import ContractContext from "../../context/contract/ContractContext";
import {ethers} from 'ethers'
import ABI from "../../context/contract/VotesCotract.json";
const { Title, Text } = Typography;


const ListPostulante = ({ electionInfo, updateListCandidates,userId }) => {
  const [candidates, setCandidates] = useState([]);
  const [disabledBtnVote, setDisabledBtnVote] = useState(true);
  const {loadEthereum} = useContext(ContractContext);




  const toggleDisable = () => {
    setDisabledBtnVote(true)
  };
  let contractAddress = '0x263ca502164a8D69df8adE929C0C6484Fae565D3';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

  const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

  const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

  if(window.ethereum){
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
  }
  
  const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, ABI.abi, tempSigner);
		setContract(tempContract);	
	}

	const setHandler = (idCadidato, idElection) => {
    
		contract.createVote(idCadidato,idElection);
	}

	const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (electionInfo.election !== null) {
        
          const res = await electionService.allCandidates(electionInfo.election.id);
          setCandidates(res.data.candidates);
          if(electionInfo.election.status === "VOTACION"){
            const res2 = await electionService.verifyUserVoteElection(userId, electionInfo.election.id);
            if(res2.data.status === false){
              setDisabledBtnVote(false);
            }
          }
        }
        
      } catch (error) {
        
      }
    };
    fetchData();
  }, [electionInfo, updateListCandidates]);

  return (
    <>
      <Title level={5}>Lista de candidatos:</Title>
      {!disabledBtnVote && (<Text type="warning">Por favor emita su voto!</Text>)}
      <Button onClick={connectWalletHandler}>Conectar con Meta</Button>
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
