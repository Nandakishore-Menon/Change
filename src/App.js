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
import { Route, Routes } from "react-router-dom";
import { Router } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import AllPetitions from "./components/AllPetitions";
import PetitionForm from "./components/PetitionForm";
import MyPetitions from "./components/MyPetitions";
import Profile from "./components/Profile";
import FullPetition from "./components/FullPetition";
import theme from "./Theme";
import "@fontsource/dm-sans";
import "@fontsource/mulish";
// import "@fontsource/josefin-sans";
import "@fontsource/quicksand";
// import "@fontsource/poppins";

function App(props) {

    var initialState = {
        web3: null,
        contract: null,
        account: null,
        userExists:-1
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "setContract":
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
            case "setUserExists":
                return {
                    ...state,
                    userExists: action.payload.userExists
                }
          default:
            return state;
        }
      };

return (<>
        <StateProvider initialState = {initialState} reducer = {reducer}>
        <ChakraProvider theme={theme}>
            {/* <MainPage/> */}
            <MyNavbar />
                <Routes>
                    <Route path={`/`} element={<><LandingPage/></>} />
                    <Route path={`/startPetition`} element={<><PetitionForm/></>}/>
                    <Route path ={`/myPetitions`} element={<><MyPetitions/></>} />
                    <Route path={`/:name`} element={<><Profile/></>} />
                    <Route path={`/petitions/:pid`} element={<><FullPetition/></>} />
                </Routes>
            {/* <NewNavbar></NewNavbar> */}
            
        </ChakraProvider>
        </StateProvider>
    </>);
}

export default App;