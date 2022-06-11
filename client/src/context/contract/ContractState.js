import { useState } from "react";
import ContractContext from "./ContractContext";
import contractJSON from "./VotesCotract.json";
import { ethers } from "ethers";

const ContractState = (props) => {
  const [contract, setContract] = useState({ account: null,contractAddress: null, contractInstance: null });
  const initialContract = async () => {
    await loadEthereum();
     checkWalletIsConnected();
     await connectWalletHandler();
     
  };
  const loadEthereum = async () => {
    const contractAddress = "0xD4436971C102da22E0Cb7636b8b9a3E8F5Cb437D"
    const abi = contractJSON.abi;

    try {
        const { ethereum } = window;
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, abi, signer);
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
      }}
    >
      {props.children}
    </ContractContext.Provider>
  );
};

export default ContractState;
