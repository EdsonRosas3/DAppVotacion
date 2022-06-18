import { useState } from "react";
import ContractContext from "./ContractContext";
import contractJSON from "./VotesCotract.json";
import { ethers } from "ethers";

const ContractState = (props) => {
  const [contract, setContract] = useState({ account: null,contractAddress: null, contractInstance: null });
  const [block,setBlock ] = useState({ blockNumber: null, blockTimestamp: null });
  const initialContract = async () => {
      
      //loadEthereum();
     
     
  };
  const loadEthereum = async () => {
    const contractAddress = "0x5BD7cC2caAbBcf3F6A37C579622BC04E5018771b"
    const abi = contractJSON.abi;
    checkWalletIsConnected()
    try {
        const { ethereum } = window;
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const account = await ethereum.request({method: "eth_requestAccounts"});
            ///console.log("ADRES: ",account)
            provider.on("block", (block) => {
              setBlock({ block })
            })

            const contractInitial = new ethers.Contract(contractAddress, abi, provider);
            const contractInstance = await contractInitial.deployed()
            setContract({ account: provider.address, contractAddress, contractInstance });
            
        }
        
    } catch (error) {
        
    }

  };

  const connectWalletHandler = async () => {
    const {ethereum} = window;
    if (!ethereum) {
        console.log("please install metamask");
    }
    try {
        const account = await ethereum.request({method: "eth_requestAccounts"});
        console.log("Addres: ",account[0]);
        setContract({...contract,account: account[0]});
    } catch (error) {
        console.log("error: ",error);
    }
  }
  const checkWalletIsConnected = () => {
    const {ethereum} = window;
    if (ethereum) {
        console.log("ethereum is connected");
    }
    else(
        console.log("ethereum is not connected, no existing wallet")
        
    )
  }
  return (
    <ContractContext.Provider
      value={{
        initialContract,
        contract,
        block
      }}
    >
      {props.children}
    </ContractContext.Provider>
  );
};

export default ContractState;
