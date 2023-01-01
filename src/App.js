import Navbar from "./components/Navbar";
import {  useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import Web3 from "web3";
import {  useWeb3React } from '@web3-react/core'
import {CoinbaseWallet, Injected} from "./components/wallet/Connector"
import { StateProvider } from "./StateProvider";
import { abi } from "./contract/petition";
import Homepage from "./components/Homepage";
import { Button, UserIcon } from "evergreen-ui";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";


function App(props) {
    // const { active, account, library, connector, activate, deactivate } = useWeb3React()
    // const [web3, setWeb3] = useState();
    // const [contract, setContract] = useState();
    // const [account,setAccount] = useState();
    
    // CoinbaseWallet.currentProvider.enable();
    // const web3 = new Web3(window.ethereum.providers[1]);
    // const web3 = new Web3(window.ethereum.providers[1]);
    // const networkId = web3.eth.net.getId;
    // const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
    var initialState = {
        web3: null,
        contract: null,
        account: null
    }

    const reducer = (state, action) => {
        console.log("state:",state);
        console.log("Action :",action);
        switch (action.type) {
            case "setContract":
                // console.log(action.contract);
                return {
                ...state,
                contract: action.payload.contract,
                };
            case "setWeb3":
                return {
                    ...state,
                    web3: action.payload.web3
                };
            case "setAccount":
                return {
                    ...state,
                    account: action.payload.account
                };
          default:
            return state;
        }
      };



    // async function connect(wallet_id) {
    //     if(wallet_id == 1) {
    //         try {
    //             console.log('CALLING ACTIVATE FOR COINBASE');
    //             await activate(CoinbaseWallet)
    //             console.log(await CoinbaseWallet.getAccount())
    //             const temp_web3 = new Web3(CoinbaseWallet);
                
    //         } catch (ex) {
    //             console.log(ex)
    //         }
    //     }
    //     else {
    //         try {
    //             console.log('CALLING ACTIVATE FOR INJECTED WALLET');
    //             await activate(Injected);
    //             const tw3 = new Web3(Injected);
    //             console.log(await Injected.getAccount())
    //             // call dispatch here
    //         } catch (ex) {
    //             console.log(ex)
    //         }
    //     }
    //     console.log("address:" + await account);

    //     // var doesExist = await contract.methods.userExists(account).call({from: account});
    //     // console.log("Exists:" + doesExist);
    //     console.log("SEND in Activate ",web3.currentProvider.send);
    // }
        
    // async function disconnect() {
    //     try {
    //         deactivate()
    //     } catch (ex) {
    //         console.log(ex)
    //     }
    // } 


    // console.log(process.env.REACT_APP_INFURA_KEY);
    // console.log("web3",web3);
    // console.log("PROVIDER ",window.ethereum.providers[0]);
    // console.log("NETWORK ID",networkId);
    // console.log("ACCOUNT ",account);
    // console.log(" PROVIDER METHODS ",CoinbaseWallet);
    // if(active)console.log(web3.eth.getAccounts());
    // console.log("Current Provider",web3.currentProvider);
    // console.log("contract methods",contract.methods); 
    return (<>
        <StateProvider initialState = {initialState} reducer = {reducer}>
        <ChakraProvider>
            <MainPage/>
            {/* <Navbar onClickFunction={setDisplayCount} isConnected={active} connectWallet={connect} initialState={initialState} /> */}
            {/* <Homepage setDisplayCount={setDisplayCount} displayCount={displayCount} initialState={initialState}></Homepage> */}
        </ChakraProvider>
        </StateProvider>
    </>);
}

export default App;