import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Center, ChakraProvider, Divider, Stack } from '@chakra-ui/react'
import Petition from "./components/Petition";
import PetitionForm from "./components/PetitionForm";
import Web3 from "web3";
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import {CoinbaseWallet, Injected} from "./components/wallet/Connector"
import { act } from "react-dom/test-utils";
import { StateProvider } from "./StateProvider";
import { abi } from "./contract/petition";
import Homepage from "./components/Homepage";


function App(props) {
    
    const [displayCount,setDisplayCount] = useState(0);// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const web3 = new Web3(CoinbaseWallet);
    const networkId = web3.eth.net.getId;
    const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
    const initialState = {
        web3: web3,
        contract: contract
    }

    const reducer = (state, action) => {
        switch (action.type) {
          case "setContract":
            return {
              ...state,
              contract: action.contract,
            };
    
          default:
            return state;
        }
      };



    async function connect(wallet_id) {
        if(wallet_id == 1) {
            try {
                await activate(CoinbaseWallet)
            } catch (ex) {
                console.log(ex)
            }
        }
        else {
            try {
                await activate(Injected)
            } catch (ex) {
                console.log(ex)
            }
        }
    }
        
    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    } 

    console.log(process.env.REACT_APP_INFURA_KEY);
    
    return (<>
        <StateProvider initialState = {initialState} reducer = {reducer}>
        <ChakraProvider>
            <Navbar onClickFunction={setDisplayCount} isConnected={active} connectWallet={connect} />
            <Homepage setDisplayCount={setDisplayCount} displayCount={displayCount}></Homepage>
        </ChakraProvider>
        </StateProvider>
    </>);
}

export default App;