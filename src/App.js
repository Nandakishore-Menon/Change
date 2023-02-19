import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./components/LandingPage";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import PetitionForm from "./components/PetitionForm";
import MyPetitions from "./components/MyPetitions";
import Profile from "./components/Profile";
import FullPetition from "./components/FullPetition";
import theme from "./Theme";
import "@fontsource/dm-sans";
import "@fontsource/mulish";
import "@fontsource/quicksand";
import "@fontsource/poppins";
import "@fontsource/inter";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { StateProvider } from "./StateProvider";
import { useEffect } from "react";

function App() {
  var initialState = {
    web3: null,
    contract: null,
    nft_contract: null,
    account: null,
    userExists: -1,
  };
  // MoralisInit();
  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: process.env.REACT_APP_LIVEPEER_API,
    }),
  });

  

  const reducer = (state, action) => {
    switch (action.type) {
      case "setContract":
        return {
          ...state,
          contract: action.payload.contract,
        };
      case "setNFTContract":
        return {
          ...state,
          nft_contract: action.payload.nft_contract,
        };
      case "setWeb3":
        return {
          ...state,
          web3: action.payload.web3,
        };
      case "setAccount":
        return {
          ...state,
          account: action.payload.account,
        };
      case "setDisconnect":
      return {
        ...state,
        disconnect: action.payload.disconnect,
      };
      case "setUserExists":
        return {
          ...state,
          userExists: action.payload.userExists,
        };
      case "setProfile":
        return {
          ...state,
          profile: action.payload.profile,
          nftsOwned: action.payload.nftsOwned
        };
      default:
        return state;
    }
  };

  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <LivepeerConfig client={livepeerClient}>
          <ChakraProvider theme={theme}>
            {/* <MainPage/> */}
            <MyNavbar />
            <Routes>
              <Route
                path={`/`}
                element={
                  <>
                    <LandingPage />
                  </>
                }
              />
              <Route
                path={`/startPetition`}
                element={
                  <>
                    <PetitionForm />
                  </>
                }
              />
              <Route
                path={`/myPetitions`}
                element={
                  <>
                    <MyPetitions />
                  </>
                }
              />
              <Route
                path={`/:name`}
                element={
                  <>
                    <Profile />
                  </>
                }
              />
              <Route
                path={`/petitions/:pid`}
                element={
                  <>
                    <FullPetition />
                  </>
                }
              />
            </Routes>
            {/* <NewNavbar></NewNavbar> */}
          </ChakraProvider>
        </LivepeerConfig>
      </StateProvider>
    </>
  );
}

export default App;
